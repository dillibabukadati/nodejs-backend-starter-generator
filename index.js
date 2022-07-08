#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const CURR_DIR = process.cwd();
const CHOICES = fs
  .readdirSync(`${__dirname}/templates`)
  .filter((f) => !f.startsWith("."));
let projectName = "";
let version = "";
let description = "";
let author = "";
let database = "";
let dbUserName = "";
let dbPassword = "";
let dbHost = "";
const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "version",
    type: "input",
    message: "version:",
    default: "1.0.0",
  },
  {
    name: "description",
    type: "input",
    message: "description:",
  },
  {
    name: "author",
    type: "input",
    message: "author:",
  },
  {
    name: "database",
    type: "input",
    message: "database name:",
  },
  {
    name: "dbUserName",
    type: "input",
    message: "db user name:",
  },
  {
    name: "dbPassword",
    type: "input",
    message: "db password:",
  },
  {
    name: "dbHost",
    type: "input",
    message: "db host:",
    default: "127.0.0.1",
  },
];

// inquirer.prompt(QUESTIONS).then((answers) => {
//   console.log(answers);
// });

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers["project-choice"];
  projectName = answers["project-name"];
  version = answers["version"];
  description = answers["description"];
  author = answers["author"];
  database = answers["database"];
  dbUserName = answers["dbUserName"];
  dbPassword = answers["dbPassword"];
  dbHost = answers["dbHost"];

  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  createDirectoryContents(templatePath, projectName);
  updateConfigFilesOfProject(`${CURR_DIR}/${projectName}`);
});

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}

function updatePackageJson(projectPath) {
  const filePath = `${projectPath}/package.json`;
  const file = require(filePath);
  file.name = projectName;
  file.version = version;
  file.description = description;
  file.author = author;
  fs.writeFile(filePath, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

function updateConfigFile(projectPath) {
  const filePath = `${projectPath}/.env`;
  // const file = require(filePath);

  const jwtSecret = require("crypto").randomBytes(256).toString("base64");
  let DB_HOST = `DB_HOST=${dbHost}`;
  let DB_DATABASE = `DB_DATABASE=${database}`;
  let DB_USER_NAME = `DB_USER_NAME=${dbUserName}`;
  let DB_PASSWORD = `DB_PASSWORD=${dbPassword}`;
  let APP_PORT = `APP_PORT=3000`;
  let JWT_SECRET = `JWT_SECRET=${jwtSecret}`;
  let LOG_BASE_PATH = `LOG_BASE_PATH=/tmp`;
  fs.appendFileSync(filePath, DB_HOST + "\n");
  fs.appendFileSync(filePath, DB_DATABASE + "\n");
  fs.appendFileSync(filePath, DB_USER_NAME + "\n");
  fs.appendFileSync(filePath, DB_PASSWORD + "\n");
  fs.appendFileSync(filePath, APP_PORT + "\n");
  fs.appendFileSync(filePath, JWT_SECRET + "\n");
  fs.appendFileSync(filePath, LOG_BASE_PATH + "\n");
}
function updateSwaggerOptions(projectPath) {
  const filePath = `${projectPath}/utils/swagger-options.json`;
  const file = require(filePath);

  file.swaggerDefinition.info.title = projectName;
  file.swaggerDefinition.info.declaration = description;
  file.swaggerDefinition.info.contact.name = author;

  fs.writeFile(filePath, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
  });
}
function updateConfigFilesOfProject(projectPath) {
  // updating package.json file
  updatePackageJson(projectPath);
  updateConfigFile(projectPath);
  updateSwaggerOptions(projectPath);
  console.log(`Project Generated Successfully at ${projectPath} Enjoy!!`);
}
