/* eslint-disable */
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const { existsSync } = require("fs");
const { writeFile, readFile, rm } = require("fs/promises");
const {
  startsWithTag,
  endsWithEndTag,
  includesTodoItems,
  doesNotStartWithTag,
  includesTag,
  precedingSections,
  checkedBox,
  uncheckedBox,
  subsequentSections,
  doesNotEndWithEndTag,
  includesEndTag,
} = require("./utils.helper");

function fileDoesNotExist(filename) {
  expect(existsSync(filename)).toBeFalsy();
}

function fileExists(filename) {
  expect(existsSync(filename)).toBeTruthy();
}

async function createsNewFile(file, command) {
  fileDoesNotExist(file);
  await exec(`pnpm run ${command}`);
  fileExists(file);
}

async function writesToNewFile(fileContents, config) {
  const contents = fileContents.trim();
  startsWithTag(contents, config);
  endsWithEndTag(contents, config);
  includesTodoItems(contents, 7);
}

async function preservesPrecedingSections(config, command) {
  await writeFile(config.outFile, precedingSections, {
    encoding: "utf-8",
  });
  await exec(`pnpm run ${command}`);
  const outFileContents = await readFile(config.outFile, {
    encoding: "utf8",
  });
  doesNotStartWithTag(outFileContents, config);
  includesTag(outFileContents, config);
  includesTodoItems(outFileContents, 7);
  endsWithEndTag(outFileContents, config);
}

function getInitialContent(config) {
  const initialContent = `${precedingSections}

${config.tag}

${checkedBox()}
${uncheckedBox()}

${config.endTag}

${subsequentSections}`;

  return initialContent;
}

async function preservesPrecedingAndSubsequentSections(config, command) {
  await rm(config.outFile);

  await writeFile(config.outFile, getInitialContent(config), {
    encoding: "utf-8",
  });

  await exec(`pnpm run ${command}`);

  const outFileContents = await readFile(config.outFile, {
    encoding: "utf8",
  });

  doesNotStartWithTag(outFileContents, config);
  doesNotEndWithEndTag(outFileContents, config);
  includesTag(outFileContents, config);
  includesEndTag(outFileContents, config);
  includesTodoItems(outFileContents, 7);
}

module.exports = {
  fileDoesNotExist,
  writesToNewFile,
  preservesPrecedingSections,
  createsNewFile,
  preservesPrecedingAndSubsequentSections,
};
