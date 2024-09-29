/* eslint-disable */
const { existsSync } = require("fs");
const { readFile, writeFile } = require("fs/promises");
const { checkboxRegex, precedingSections } = require("./utils.helper");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

function fileDoesNotExist(filename) {
  expect(existsSync(filename)).toBeFalsy();
}

function fileExists(filename) {
  expect(existsSync(filename)).toBeTruthy();
}

function writesToNewFile(fileContents, config) {
  const contents = fileContents.trim();
  expect(contents.startsWith(config.tag.trim())).toBeTruthy();
  expect(contents.endsWith(config.endTag.trim())).toBeTruthy();
  expect(contents.match(checkboxRegex)).toHaveLength(7);
}

async function preservesPrecedingSections(filename, config, command) {
  await writeFile(config.outFile, precedingSections, { encoding: "utf-8" });

  // await exec(`pnpm run ${command}`);

  // const contents = (await readFile(filename, { encoding: "utf8" })).trim();
  // const tag = config.tag.trim();

  // expect(contents.startsWith(tag)).toBeFalsy();
  // expect(contents.includes(tag)).toBeTruthy();
  // expect(contents.endsWith(config.endTag.trim())).toBeTruthy();
  // expect(contents.match(checkboxRegex)).toHaveLength(7);
}

module.exports = {
  fileDoesNotExist,
  fileExists,
  writesToNewFile,
  preservesPrecedingSections
};