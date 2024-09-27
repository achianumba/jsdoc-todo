/* eslint-disable */
const { writeToDoToFile, save } = require("jsdoc-todo/save");
const { config, todoText, todoList } = require("./fixtures/utils.helper");
const { resolve } = require("path");
const { readFileSync } = require("fs");

describe("getTodoText():", () => {
  test("starts with config.tag", () => {
    expect(todoText.startsWith(config.tag)).toBeTruthy();
  });

  test("ends with config.endTag", () => {
    expect(todoText.trim().endsWith(config.endTag));
  })

  test("correctly inserts overwrite warning", () => {
    expect(todoText.includes(`IF YOU MUST DIRECTLY/MANUALLY INCLUDE TO DO ITEMS IN THIS DOCUMENT,
PLEASE ADD THEM DIRECTLY BELOW THE "@endtodolist" HTML COMMENT BELOW.`)).toBeTruthy();
  });

  test("correctly inserts the to-do section's heading", () => {
    expect(todoText.includes(`## ${config.heading}`)).toBeTruthy();
  });

  test("correctly inserts todo items", () => {
    expect(todoText.includes(todoList.join("\n"))).toBeTruthy();
  });
});

test("writeTodoToFile() writes to the specified file", () => {
  const filename = resolve(varDir, "writeToFile.md");
  writeToDoToFile(filename, todoText);
  expect(readFileSync(filename, {encoding: "utf-8"}).trim()).toBe(todoText.trim());
});