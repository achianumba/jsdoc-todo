/* eslint-disable */
const { createCheckbox } = require("jsdoc-todo/create-checkbox");

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
)

module.exports = {
  checked,
  unchecked,
  checkedBox,
  uncheckedBox
}