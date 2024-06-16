const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const salesforceCommands = require("./commands/salesforceCommands");
const gitCommands = require("./commands/gitCommands");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const Logger = require("./utils/logger");

console.log("Starting server...");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Salesforce and Git integration server.");
});

app.get("/branches", (req, res) => {
  try {
    const result = gitCommands.listBranches();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error to retrieve all branches:", error);
    res.status(500).send("Error to retrieve all branches");
  }
});

app.get("/download", (req, res) => {
  console.log("Received request for /download");
  salesforceCommands.downloadData(req, res);
});

app.get("/compareChanges", (req, res) => {
  console.log("Received request for /compareChanges");
  salesforceCommands.compareData(req, res);
});

app.post("/insert", (req, res) => {
  console.log("Received request for /insert");
  salesforceCommands.insertData(req, res);
});

app.post("/update", (req, res) => {
  console.log("Received request for /update");
  salesforceCommands.updateData(req, res);
});

app.post("/delete", (req, res) => {
  console.log("Received request for /delete");
  salesforceCommands.deleteData(req, res);
});

app.post("/create-package", (req, res) => {
  const { type, name, description, differences } = req.body;
  const logger = new Logger(true);

  console.log("Received package details:", {
    type,
    name,
    description,
    differences,
  });

  if (!name || !differences || !Array.isArray(differences)) {
    console.error("Invalid package details:", { name, differences });
    return res.status(400).send("Invalid package details");
  }

  try {
    const branchName = `${type}/${name.replace(/[^a-zA-Z0-9]/g, "-")}`;
    console.log("Creating package with:", { branchName, differences });
    gitCommands.createBranch(branchName, differences, description, logger);
    res.status(200).send({ message: "Package created successfully" });
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).send("Error creating package");
  }
});

app.post("/deploy-metadata", async (req, res) => {
  console.log("Received request for /deploy-metadata");
  try {
    await salesforceCommands.deployMetadata();
    res.send("Metadata deployed successfully");
  } catch (error) {
    console.error("Error deploying metadata:", error.message);
    res.status(500).send(`Error deploying metadata: ${error.message}`);
  }
});

app.post("/retrieve-metadata", async (req, res) => {
  console.log("Received request for /retrieve-metadata");
  try {
    await salesforceCommands.retrieveMetadata();
    res.send("Metadata retrieved successfully");
  } catch (error) {
    console.error("Error retrieving metadata:", error.message);
    res.status(500).send(`Error retrieving metadata: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3094;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Log all routes
  console.log("Registered Routes:");
  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
});

yargs(hideBin(process.argv))
  .command("git", "Executes Git operations", {
    builder: (yargs) =>
      yargs
        .option("createFeature", {
          alias: "f",
          type: "string",
          description: "Create a feature branch from develop",
          requiresArg: true,
        })
        .option("createHotfix", {
          alias: "h",
          type: "string",
          description: "Create a hotfix branch from develop",
          requiresArg: true,
        })
        .option("createDocs", {
          alias: "d",
          type: "string",
          description: "Create a documentation branch from develop",
          requiresArg: true,
        })
        .option("description", {
          alias: "desc",
          type: "string",
          description: "Description for the new branch",
          requiresArg: true,
        })
        .option("listBranches", {
          alias: "l",
          type: "boolean",
          description: "List all branches",
          requiresArg: false,
        })
        .option("mergeBranch", {
          alias: "m",
          type: "string",
          description:
            "Merge one branch into another in the format source:target",
          requiresArg: true,
          coerce: (arg) => {
            const [source, target] = arg.split(":");
            return { source, target };
          },
        })
        .option("deleteBranch", {
          alias: "del",
          type: "string",
          description: "Delete a branch",
          requiresArg: true,
        })
        .option("pushBranch", {
          alias: "p",
          type: "string",
          description: "Push a branch to remote",
          requiresArg: true,
        }),
    handler: (argv) => {
      console.log("Running git command...");
      gitCommands.run(argv);
    },
  })
  .command("salesforce", "Executes Salesforce operations", {
    handler: (argv) => {
      console.log("Running salesforce command...");
      salesforceCommands.run({ verbose: argv.verbose });
    },
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
    default: false,
  })
  .parse();
