/* eslint-disable */
const { existsSync } = require("fs");
const { mkdir } = require("fs/promises");

module.exports = async function (globalConfig, projectConfig) {
  const varDir = projectConfig.globals.varDir;
  !existsSync(varDir) && await mkdir(varDir, { recursive: true, force: true });
  await projectConfig.globals.cleanup(projectConfig.globals);
}