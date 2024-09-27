/* eslint-disable */
const { existsSync } = require("fs");
const { rm, mkdir } = require("fs/promises");

module.exports = async function (globalConfig, projectConfig) {
  const readme = projectConfig.globals.readme;
  const varDir = projectConfig.globals.varDir;

  !existsSync(varDir) && await rm(varDir, { recursive: true, force: true });
  !existsSync(readme) && await rm(readme, { force: true });

  await mkdir(varDir, { recursive: true });
}
