/* eslint-disable */
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const { readFile } = require("fs/promises");
const {
  config,
  userConfigJS,
  userConfigJSON,
} = require("./fixtures/utils.helper");
const {
  fileDoesNotExist,
  writesToNewFile,
  preservesPrecedingSections,
  createsNewFile,
  preservesPrecedingAndSubsequentSections,
} = require("./fixtures/jsdoc-todo.helper");

test("Running jsdoc with an empty to do list does not write to config.outFile", async () => {
  const { stdout } = await exec("pnpm run jsdoc:empty:config");
  expect(stdout.includes("No 'to do' items/lists found!")).toBeTruthy();
  fileDoesNotExist(readme);
});

describe("Running jsdoc WITHOUT a populated todoPlugin object in the config file:", () => {
  test("creates a README.md file if it doesn't exist", async () => {
    await createsNewFile(config.outFile, "jsdoc:no:config");
  });

  test("writes 'to do' items to the README.md file", async () => {
    const readmeContents = await readFile(config.outFile, {
      encoding: "utf-8",
    });
    writesToNewFile(readmeContents, config);
  });

  test("preserves preceding sections of the README.md file", async () => {
    await preservesPrecedingSections(config, "jsdoc:no:config");
  });

  test("preserves preceding and subsequent sections of the README.md file", async () => {
    await preservesPrecedingAndSubsequentSections(config, "jsdoc:no:config");
  });
});

describe("Running jsdoc WITH a populated todoPlugin object in a JS config file:", () => {
  test("creates a userConfigJS.outFile file if it doesn't exist", async () => {
    await createsNewFile(userConfigJS.outFile, "jsdoc:js:config");
  });

  test("writes 'to do' items to the userConfigJS.outFile file", async () => {
    const outFileContents = await readFile(userConfigJS.outFile, {
      encoding: "utf-8",
    });
    writesToNewFile(outFileContents, userConfigJS);
  });

  test("preserves preceding sections of the userConfigJS.outFile file", async () => {
    await preservesPrecedingSections(userConfigJS, "jsdoc:js:config");
  });

  test("preserves preceding and subsequent sections of the userConfigJS.outFile file", async () => {
    await preservesPrecedingAndSubsequentSections(
      userConfigJS,
      "jsdoc:js:config"
    );
  });
});

describe("Running jsdoc WITH a populated todoPlugin object in a JSON config file:", () => {
  test("creates a userConfigJSON.outFile file if it doesn't exist", async () => {
    await createsNewFile(userConfigJSON.outFile, "jsdoc:json:config");
  });

  test("writes 'to do' items to the userConfigJSON.outFile file", async () => {
    const outFileContents = await readFile(userConfigJSON.outFile, {
      encoding: "utf-8",
    });
    writesToNewFile(outFileContents, userConfigJSON);
  });

  test("preserves preceding sections of the userConfigJSON.outFile file", async () => {
    await preservesPrecedingSections(userConfigJSON, "jsdoc:json:config");
  });

  test("preserves preceding and subsequent sections of the userConfigJSON.outFile file", async () => {
    await preservesPrecedingAndSubsequentSections(
      userConfigJSON,
      "jsdoc:json:config"
    );
  });
});

/**
 * @todolist
 * Generate "to do" list from TS files
 * Delete todolist section from README.md if no "to do" comments are found in source code.
 */
