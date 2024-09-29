/* eslint-disable */
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { resolve } = require("path");
const { config, userConfigJS, userConfigJSON } = require("./fixtures/utils.helper");

describe("getConfig() returns the default configuration when:", () => {
  test("a config file isn't passed to the jsdoc command", async () => {
    const configOutFile = resolve(varDir, "getConfig.json");
    await exec(`node fixtures/config.helper.js > ${configOutFile}`);
    const configOut = require(configOutFile);

    for (const prop in config) {
      expect(configOut[prop]).toBe(config[prop])
    }
  });

  test("the jsdoc config file has no todoPlugin object", async () => {
    const configOutFile = resolve(varDir, "getNoConfig.json");
    await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.no.config.js > ${configOutFile}`);
    const configOut = require(configOutFile);

    for (const prop in config) {
      expect(configOut[prop]).toBe(config[prop])
    }
  });
});

describe("getConfig() overwrites the default configuration when the config file passed to jsdoc:", () => {
  test("is a JavaScript module containing a populated config.todoPlugin object", async () => {
    const configOutFile = resolve(varDir, "getUserConfigJS.json");
    await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.config.js > ${configOutFile}`);
    const configOut = require(configOutFile);

    for (const prop in userConfigJS) {
      expect(configOut[prop]).toBe(userConfigJS[prop]);
    }
  });

  test("is a JSON file containing a populated config.todoPlugin object", async () => {
    const configOutFile = resolve(varDir, "getUserConfigJSON.json");
    await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.config.json > ${configOutFile}`);
    const configOut = require(configOutFile);

    for (const prop in userConfigJSON) {
      expect(configOut[prop]).toBe(userConfigJSON[prop]);
    }
  });
});

test("getConfig() does not honour user-defined endTags", async () => {
  const configOutFile = resolve(varDir, "getUserConfigEndTag.json");
  await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.config.js > ${configOutFile}`);
  const configOut = require(configOutFile);

  expect(configOut.endTag).not.toBe("xyz");
});