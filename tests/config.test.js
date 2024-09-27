/* eslint-disable */
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { resolve } = require("path");
const defaultConfig = require("jsdoc-todo/config").getConfig();

const userConfigJS = require("./fixtures/jsdoc.config").todoPlugin;
userConfigJS.outFile = resolve(process.cwd(), userConfigJS.outFile);
userConfigJS.endTag = `<!-- @end${userConfigJS.tag} -->`;
userConfigJS.tag = `<!-- ${userConfigJS.tag}`;

const userConfigJSON = require("./fixtures/jsdoc.config.json").todoPlugin;
userConfigJSON.outFile = resolve(process.cwd(), userConfigJSON.outFile);
userConfigJSON.endTag = `<!-- @end${userConfigJSON.tag} -->`;
userConfigJSON.tag = `<!-- ${userConfigJSON.tag}`;

describe("getConfig() returns the default configuration when:", () => {
  test("a config file isn't passed to the jsdoc command", async () => {
    const configOutFile = resolve(varDir, "getConfig.json");
    await exec(`node fixtures/config.helper.js > ${configOutFile}`);
    const configOutObject = require(configOutFile);

    for (const prop in defaultConfig) {
      expect(configOutObject[prop]).toBe(defaultConfig[prop])
    }
  });

  test("the jsdoc config file has no todoPlugin object", async () => {
    const configOutFile = resolve(varDir, "getNoConfig.json");
    await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.no.config.js > ${configOutFile}`);
    const configOutObject = require(configOutFile);

    for (const prop in defaultConfig) {
      expect(configOutObject[prop]).toBe(defaultConfig[prop])
    }
  });
});

describe("getConfig() overwrites the default configuration when the config file passed to jsdoc:", () => {
  test("is a JavaScript module containing a populated config.todoPlugin object", async () => {
    const configOutFile = resolve(varDir, "getUserConfigJS.json");
    await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.config.js > ${configOutFile}`);
    const configOutObject = require(configOutFile);

    for (const prop in userConfigJS) {
      expect(configOutObject[prop]).toBe(userConfigJS[prop]);
    }
  });

  test("is a JSON file containing a populated config.todoPlugin object", async () => {
    const configOutFile = resolve(varDir, "getUserConfigJSON.json");
    await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.config.json > ${configOutFile}`);
    const configOutObject = require(configOutFile);

    for (const prop in userConfigJSON) {
      expect(configOutObject[prop]).toBe(userConfigJSON[prop]);
    }
  });
});

test("getConfig() does not honour user-defined endTags", async () => {
  const configOutFile = resolve(varDir, "getUserConfigEndTag.json");
  await exec(`node fixtures/config.helper.js -c fixtures/jsdoc.config.js > ${configOutFile}`);
  const configOutObject = require(configOutFile);

  expect(configOutObject.endTag).not.toBe("xyz");
});