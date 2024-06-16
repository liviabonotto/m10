const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const jsforce = require("jsforce");
const xml2js = require("xml2js");
const { promisify } = require("util");
const execPromise = promisify(exec);

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const SF_USERNAME = process.env.SF_USERNAME;
const SF_PASSWORD = process.env.SF_PASSWORD;
const SF_SECURITY_TOKEN = process.env.SF_SECURITY_TOKEN;
const SF_LOGIN_URL = process.env.SF_LOGIN_URL;
const TARGET_ORG = process.env.TARGET_ORG;

const DOWNLOAD_DIR = path.join(__dirname, "../../salesforce_downloads");
const SALESFORCE_APP_DIR = path.join(DOWNLOAD_DIR, "force-app");
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}
if (!fs.existsSync(SALESFORCE_APP_DIR)) {
  fs.mkdirSync(SALESFORCE_APP_DIR);
}

const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL,
});

const loginToSalesforce = async () => {
  console.log("Checking credentials:");
  console.log("Username:", SF_USERNAME ? "Provided" : "Not Provided");
  console.log("Password:", SF_PASSWORD ? "Provided" : "Not Provided");
  console.log(
    "Security Token:",
    SF_SECURITY_TOKEN ? "Provided" : "Not Provided"
  );
  console.log("Login URL:", SF_LOGIN_URL ? SF_LOGIN_URL : "Not Provided");

  if (!SF_USERNAME || !SF_PASSWORD || !SF_SECURITY_TOKEN || !SF_LOGIN_URL) {
    console.error("Missing one or more required environment variables.");
    process.exit(1);
  }

  try {
    const fullPassword = SF_PASSWORD + SF_SECURITY_TOKEN;
    console.log("Attempting to log in with username:", SF_USERNAME);
    await conn.login(SF_USERNAME, fullPassword);
    console.log("Salesforce login successful");
    console.log("User Info:", conn.userInfo);
    console.log("User ID: ", conn.userInfo.id);
    console.log("Org ID: ", conn.userInfo.organizationId);
    return conn;
  } catch (err) {
    console.error("Salesforce login error:", err.message);
    throw err;
  }
};

const deployMetadata = async () => {
  console.log("Starting metadata deployment...");
  try {
    const { stdout, stderr } = await execPromise(
      `sfdx force:source:deploy -p force-app -u ${TARGET_ORG}`
    );
    console.log(`Metadata deployed: ${stdout}`);
    if (stderr) {
      console.error(`Deployment errors: ${stderr}`);
    }
  } catch (error) {
    console.error(`Error deploying metadata: ${error.message}`);
    throw error;
  }
};

const retrieveMetadata = async () => {
  console.log("Starting metadata retrieval...");
  try {
    const { stdout, stderr } = await execPromise(
      `sfdx force:source:retrieve -m ApexClass,LightningComponentBundle,CustomObject -r ${SALESFORCE_APP_DIR} -u ${TARGET_ORG}`
    );
    console.log(`Metadata retrieved: ${stdout}`);
    if (stderr) {
      console.error(`Retrieval errors: ${stderr}`);
    }
  } catch (error) {
    console.error(`Error retrieving metadata: ${error.message}`);
    throw error;
  }
};

const downloadData = async (req, res) => {
  try {
    console.log("Initiating data download from Salesforce...");
    await loginToSalesforce();

    const query = "SELECT Id, Name, LastModifiedDate FROM Account";
    console.log("Executing query:", query);
    const result = await conn.query(query);

    const records = result.records.map((record) => ({
      id: record.Id,
      name: record.Name,
      lastModifiedDate: record.LastModifiedDate,
    }));

    const builder = new xml2js.Builder();
    const xmlContent = builder.buildObject({ records });

    const filePath = path.join(DOWNLOAD_DIR, "salesforce_data.xml");
    console.log("Writing downloaded data to:", filePath);
    fs.writeFileSync(filePath, xmlContent);

    res.send(`Downloaded data saved to ${filePath}`);
  } catch (err) {
    console.error("Error downloading data:", err.message);
    res.status(500).send(`Error downloading data: ${err.message}`);
  }
};

const compareData = async (req, res) => {
  console.log("Initiating force-app comparison...");
  const localForceAppPath = path.join(__dirname, "../force-app");
  const salesforceForceAppPath = SALESFORCE_APP_DIR;

  console.log("Local force-app path:", localForceAppPath);
  console.log("Salesforce force-app path:", salesforceForceAppPath);

  if (!fs.existsSync(localForceAppPath)) {
    console.error(
      "Local force-app directory does not exist:",
      localForceAppPath
    );
    return res.status(400).send("Local force-app directory does not exist.");
  }
  if (!fs.existsSync(salesforceForceAppPath)) {
    console.error(
      "Salesforce force-app directory does not exist:",
      salesforceForceAppPath
    );
    return res
      .status(400)
      .send("Salesforce force-app directory does not exist.");
  }

  const readDirectoryRecursive = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(readDirectoryRecursive(file));
      } else {
        results.push(file);
      }
    });
    return results;
  };

  const localFiles = readDirectoryRecursive(localForceAppPath);
  const salesforceFiles = readDirectoryRecursive(salesforceForceAppPath);

  const parseXml = async (filePath) => {
    const xml = fs.readFileSync(filePath, "utf8");
    const parser = new xml2js.Parser();
    return await parser.parseStringPromise(xml);
  };

  try {
    const localParsedFiles = await Promise.all(localFiles.map(parseXml));
    const salesforceParsedFiles = await Promise.all(
      salesforceFiles.map(parseXml)
    );

    const localFileNames = localFiles.map((file) =>
      path.relative(localForceAppPath, file)
    );
    const salesforceFileNames = salesforceFiles.map((file) =>
      path.relative(salesforceForceAppPath, file)
    );

    const differences = [];
    const packageXml = { Package: { types: [] } };

    for (let i = 0; i < localFileNames.length; i++) {
      const localFileName = localFileNames[i];
      const localParsedFile = localParsedFiles[i];
      const salesforceIndex = salesforceFileNames.indexOf(localFileName);

      if (salesforceIndex === -1) {
        differences.push({
          file: localFileName,
          status: "missing_in_salesforce",
          content: localParsedFile,
        });
        packageXml.Package.types.push({
          members: localFileName,
          name: path.extname(localFileName).substring(1),
        });
      } else {
        const salesforceParsedFile = salesforceParsedFiles[salesforceIndex];
        if (
          JSON.stringify(localParsedFile) !==
          JSON.stringify(salesforceParsedFile)
        ) {
          differences.push({
            file: localFileName,
            status: "different_content",
            local: localParsedFile,
            salesforce: salesforceParsedFile,
          });
          packageXml.Package.types.push({
            members: localFileName,
            name: path.extname(localFileName).substring(1),
          });
        }
      }
    }

    // Generate package.xml
    const builder = new xml2js.Builder();
    const packageXmlContent = builder.buildObject(packageXml);
    const packageXmlPath = path.join(DOWNLOAD_DIR, "package.xml");
    fs.writeFileSync(packageXmlPath, packageXmlContent);

    res.json({ differences, packageXmlPath });
  } catch (err) {
    console.error("Error comparing force-app:", err.message);
    res.status(500).send(`Error comparing force-app: ${err.message}`);
  }
};

const TEMP_DOWNLOAD_DIR = "./temp_salesforce_downloads";
const TARGET_REPO_DIR = path.resolve(__dirname, "../../target-repo/force-app");
const LOCAL_DIR = path.resolve(__dirname, "../../src/force-app");

if (!fs.existsSync(TEMP_DOWNLOAD_DIR)) {
  fs.mkdirSync(TEMP_DOWNLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(TARGET_REPO_DIR)) {
  fs.mkdirSync(TARGET_REPO_DIR, { recursive: true });
}

const compareAndMoveDifferences = async () => {
  console.log("Initiating data comparison...");
  const salesforceDataPath = TEMP_DOWNLOAD_DIR;
  const localDataPath = LOCAL_DIR;

  if (!fs.existsSync(salesforceDataPath)) {
    throw new Error("Salesforce data directory does not exist.");
  }
  if (!fs.existsSync(localDataPath)) {
    throw new Error("Local data directory does not exist.");
  }

  const readDir = promisify(fs.readdir);
  const readFile = promisify(fs.readFile);
  const writeFile = promisify(fs.writeFile);
  const mkdir = promisify(fs.mkdir);

  const getFiles = async (dir) => {
    const subdirs = await readDir(dir);
    const files = await Promise.all(
      subdirs.map(async (subdir) => {
        const res = path.resolve(dir, subdir);
        return (await fs.statSync(res)).isDirectory() ? getFiles(res) : res;
      })
    );
    return files.reduce((a, f) => a.concat(f), []);
  };

  const compareFiles = async (localFiles, salesforceFiles) => {
    const localSet = new Set(
      localFiles.map((file) => path.relative(localDataPath, file))
    );
    const salesforceSet = new Set(
      salesforceFiles.map((file) => path.relative(salesforceDataPath, file))
    );

    const differences = {
      onlyInLocal: [...localSet].filter((x) => !salesforceSet.has(x)),
      onlyInSalesforce: [...salesforceSet].filter((x) => !localSet.has(x)),
      differentContent: [],
    };

    for (const relativeFile of [...localSet].filter((x) =>
      salesforceSet.has(x)
    )) {
      const localFile = path.join(localDataPath, relativeFile);
      const salesforceFile = path.join(salesforceDataPath, relativeFile);

      const localContent = await readFile(localFile, "utf8");
      const salesforceContent = await readFile(salesforceFile, "utf8");

      if (localContent !== salesforceContent) {
        differences.differentContent.push(relativeFile);
      }
    }

    return differences;
  };

  try {
    const [localFiles, salesforceFiles] = await Promise.all([
      getFiles(localDataPath),
      getFiles(salesforceDataPath),
    ]);

    const differences = await compareFiles(localFiles, salesforceFiles);

    const moveFiles = async (files, sourceDir, targetDir) => {
      for (const relativeFile of files) {
        const sourceFile = path.join(sourceDir, relativeFile);
        const targetFile = path.join(targetDir, relativeFile);

        const targetDirPath = path.dirname(targetFile);
        if (!fs.existsSync(targetDirPath)) {
          await mkdir(targetDirPath, { recursive: true });
        }

        const content = await readFile(sourceFile, "utf8");
        await writeFile(targetFile, content, "utf8");
      }
    };

    await moveFiles(
      differences.onlyInSalesforce.concat(differences.differentContent),
      salesforceDataPath,
      TARGET_REPO_DIR
    );

    console.log("Differences moved to target-repo directory.");
    return differences;
  } catch (err) {
    console.error("Error comparing and moving data:", err.message);
    throw err;
  }
};

const downloadDifferences = async (req, res) => {
  try {
    await loginToSalesforce();
    await retrieveMetadata();
    const differences = await compareAndMoveDifferences();
    res.json(differences);
  } catch (err) {
    console.error("Error downloading differences:", err.message);
    res.status(500).send(`Error downloading differences: ${err.message}`);
  }
};

const insertData = async (req, res) => {
  try {
    await loginToSalesforce();
    const newData = req.body;
    const result = await conn.sobject("Account").create(newData);
    res.send(`Record inserted with ID: ${result.id}`);
  } catch (err) {
    console.error("Error inserting data:", err.message);
    res.status(500).send(`Error inserting data: ${err.message}`);
  }
};

const updateData = async (req, res) => {
  try {
    await loginToSalesforce();
    const updatedData = req.body;
    const result = await conn.sobject("Account").update(updatedData);
    res.send(`Record updated successfully`);
  } catch (err) {
    console.error("Error updating data:", err.message);
    res.status(500).send(`Error updating data: ${err.message}`);
  }
};

const deleteData = async (req, res) => {
  try {
    await loginToSalesforce();
    const dataToDelete = req.body;
    const result = await conn.sobject("Account").destroy(dataToDelete.id);
    res.send(`Record deleted successfully`);
  } catch (err) {
    console.error("Error deleting data:", err.message);
    res.status(500).send(`Error deleting data: ${err.message}`);
  }
};

module.exports = {
  conn,
  loginToSalesforce,
  downloadDifferences,
  downloadData,
  deployMetadata,
  compareData,
  insertData,
  updateData,
  deleteData,
};
