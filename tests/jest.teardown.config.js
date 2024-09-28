/* eslint-disable */
module.exports = async function (globalConfig, projectConfig) {
  await projectConfig.globals.cleanup(projectConfig.globals); 
}