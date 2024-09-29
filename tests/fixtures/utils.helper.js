/* eslint-disable */
const { resolve } = require("path");
const { getConfig } = require("jsdoc-todo/config");
const { createCheckbox } = require("jsdoc-todo/create-checkbox");
const { getToDoText } = require("jsdoc-todo/save");

const userConfigJS = require("./jsdoc.config").todoPlugin;
const userConfigJSON = require("./jsdoc.config.json").todoPlugin;

const config = getConfig();
userConfigJS.outFile = resolve(process.cwd(), userConfigJS.outFile);
userConfigJS.endTag = `<!-- @end${userConfigJS.tag} -->`;
userConfigJS.tag = `<!-- @${userConfigJS.tag}`;

userConfigJSON.outFile = resolve(process.cwd(), userConfigJSON.outFile);
userConfigJSON.endTag = `<!-- @end${userConfigJSON.tag} -->`;
userConfigJSON.tag = `<!-- @${userConfigJSON.tag}`;

const checked = {
  todo: "Completed task. +x",
  filePath: "/path/to",
  filename: "/checked.js",
  lineNumber: 1
};

const unchecked = {
  todo: "Uncompleted task.",
  filePath: "/path/to",
  filename: "unchecked.js",
  lineNumber: 11
};

const checkedBox = () => createCheckbox(
  checked.todo,
  checked.filePath,
  checked.filename,
  checked.lineNumber
);

const uncheckedBox = () => createCheckbox(
  unchecked.todo,
  unchecked.filePath,
  unchecked.filename,
  unchecked.lineNumber
);

const todoList = [checkedBox(), uncheckedBox()];
const todoText = getToDoText(config, todoList);
const precedingSections = `
# Preceding section 1

Paragraph

## Preceding section 2

Paragraph

`;

const subsequentSections = `
## Subsequent section 1

Paragraph

## Subsequent section 2
 doesNotEndWithEndTag(contents, config) {
 }
Paragraph

`;

const checkboxRegex = /\n-\s\[(x|\s)\].*/ig;

function startsWithTag(contents, config) {
  expect(contents.trim().startsWith(config.tag.trim())).toBeTruthy();
}

function doesNotStartWithTag(contents, config) {
  expect(contents.trim().startsWith(config.tag.trim())).toBeFalsy();
}

function endsWithEndTag(contents, config) {
  expect(contents.trim().endsWith(config.endTag.trim())).toBeTruthy();
}

function includesTodoItems(contents, length) {
  expect(contents.match(checkboxRegex)).toHaveLength(length);
}

function includesTag(contents, config) {
  expect(contents.trim().includes(todoText.trim())).toBeTruthy();
}

function doesNotEndWithEndTag(contents, config) {
  expect(contents.trim().endsWith(config.endTag.trim())).toBeFalsy()
}

function includesEndTag(contents, config) {
  expect(contents.trim().includes(config.endTag.trim())).toBeTruthy();
}

module.exports = {
  config,
  userConfigJS,
  userConfigJSON,
  checked,
  unchecked,
  checkedBox,
  uncheckedBox,
  todoList,
  todoText,
  precedingSections,
  subsequentSections,
  checkboxRegex,
  startsWithTag,
  doesNotStartWithTag,
  endsWithEndTag,
  includesTodoItems,
  includesTag,
  doesNotEndWithEndTag
}