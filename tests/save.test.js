/* eslint-disable */
const { writeToDoToFile, save } = require("jsdoc-todo/save");
const { resolve } = require("path");
const { readFile } = require("fs/promises");
const { config, todoText, todoList, precedingSections } = require("./fixtures/utils.helper");

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

test("writeTodoToFile() writes to the specified file", async () => {
  const filename = resolve(varDir, "writeToFile.md");
  writeToDoToFile(filename, todoText);
  expect((await readFile(filename, { encoding: "utf-8" })).trim()).toBe(todoText.trim());
});

describe("save():", () => {
  test("returns false if todoList is empty", () => {
    expect(save([])).toBeFalsy();
  });

  test("creates a config.outFile if it doesn't exist and writes to it", async () => {
    const outFile = resolve(varDir, "nonExistingFile.md");

    save(todoList, {
      ...config,
      outFile
    });

    const outFileContents = (await readFile(outFile, { encoding: "utf-8" })).trim();
    expect(outFileContents).toBe(todoText.trim());
  });

  test("appends todoText to an existing file that does not have a 'to do' list", async () => {
    const outFile = resolve(varDir, "precedingSection.md");
    writeToDoToFile(outFile, precedingSections)
    save(todoList, { ...config, outFile });

    const outFileContents = (await readFile(outFile, { encoding: "utf-8" })).trim();
    expect(outFileContents.startsWith(config.tag.trim())).toBeFalsy();
    expect(outFileContents.endsWith(config.endTag.trim())).toBeTruthy();
  });
});