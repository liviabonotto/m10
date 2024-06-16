const { execSync, spawnSync } = require("child_process");
const Logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

const REPO_URL =
  "https://github.com/Inteli-College/2024-1B-T03-ES10-G03-SF.git";
const TARGET_REPO_PATH = path.join(__dirname, "target-repo"); // Use relative path

function ensureRepoCloned() {
  if (!fs.existsSync(TARGET_REPO_PATH)) {
    console.log("Cloning repository...");
    execSync(`git clone ${REPO_URL} ${TARGET_REPO_PATH}`, { stdio: "inherit" });
  } else {
    execSync(`git clone ${REPO_URL} ${TARGET_REPO_PATH}`, { stdio: "inherit" });
  }
}

function getGitCommand(command) {
  return `git -C ${TARGET_REPO_PATH} ${command}`;
}

function run(options) {
  ensureRepoCloned();

  const logger = new Logger(options.verbose);

  if (options.createFeature) {
    createBranch(
      `feat/${options.createFeature}`,
      options.differences,
      options.description,
      logger
    );
  } else if (options.createHotfix) {
    createBranch(
      `fix/${options.createHotfix}`,
      options.differences,
      options.description,
      logger
    );
  } else if (options.createDocs) {
    createBranch(
      `docs/${options.createDocs}`,
      options.differences,
      options.description,
      logger
    );
  } else if (options.listBranches) {
    listBranches(logger);
  } else if (options.mergeBranch) {
    mergeBranch(options.mergeBranch.source, options.mergeBranch.target, logger);
  } else if (options.deleteBranch) {
    deleteBranch(options.deleteBranch, logger);
  } else if (options.pushBranch) {
    pushBranch(options.pushBranch, logger);
  }
}

function createBranch(branchName, differences, description, logger) {
  try {
    logger.log("Saving current changes.");

    const filesToAdd = differences
      .map((file) => path.join("force-app", file))
      .join(" ");
    if (filesToAdd) {
      execSync(getGitCommand(`add ${filesToAdd}`), { stdio: "inherit" });
    }

    execSync(getGitCommand('commit -m "feat: save current changes" || true'), {
      stdio: "inherit",
    });
    execSync(getGitCommand("stash"), { stdio: "inherit" });

    logger.log("Switching to develop branch.");
    execSync(getGitCommand("checkout develop"), { stdio: "inherit" });

    logger.log(`Creating new branch: ${branchName}`);
    execSync(getGitCommand(`checkout -b ${branchName}`), { stdio: "inherit" });

    if (description) {
      execSync(
        getGitCommand(
          `commit --allow-empty -m "Create ${branchName}" -m "${description}"`,
          { stdio: "inherit" }
        )
      );
    } else {
      execSync(
        getGitCommand(`commit --allow-empty -m "Create ${branchName}"`, {
          stdio: "inherit",
        })
      );
    }
  } catch (error) {
    logger.log(`Error creating branch: ${error.message}`);
    throw error;
  }
}

function listBranches(logger) {
  try {
    const branches = execSync(
      getGitCommand(`branch -r --format=%(refname:lstrip=-2)`)
    );
    // logger.log(`Branches:\n${branches}`);
    return branches;
  } catch (error) {
    // logger.log(`Error listing branches: ${error.message}`);
  }
}

function mergeBranch(source, target, logger) {
  try {
    execSync(getGitCommand(`checkout ${target}`), { stdio: "inherit" });
    execSync(getGitCommand(`merge ${source}`), { stdio: "inherit" });
    logger.log(`Branch ${source} merged into ${target}`);
  } catch (error) {
    logger.log(`Error merging branch: ${error.message}`);
  }
}

function deleteBranch(branchName, logger) {
  try {
    execSync(getGitCommand(`branch -d ${branchName}`), { stdio: "inherit" });
    logger.log(`Branch deleted: ${branchName}`);
  } catch (error) {
    logger.log(`Error deleting branch: ${error.message}`);
  }
}

function pushBranch(branchName, logger) {
  try {
    execSync(getGitCommand(`push origin ${branchName}`), { stdio: "inherit" });
    logger.log(`Branch pushed to remote: ${branchName}`);
  } catch (error) {
    logger.log(`Error pushing branch: ${error.message}`);
  }
}

module.exports = {
  run,
  createBranch,
  listBranches,
  mergeBranch,
  deleteBranch,
  pushBranch,
  ensureRepoCloned,
};
