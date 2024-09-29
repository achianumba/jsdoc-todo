/* eslint-disable */
const { writeToDoToFile, save, getToDoText } = require("jsdoc-todo/save");
const { resolve } = require("path");
const { readFile } = require("fs/promises");
const { config, todoText, todoList, precedingSections, subsequentSections, doesNotStartWithTag, endsWithEndTag, startsWithTag, includesTodoItems, checkboxRegex, includesTag, doesNotEndWithEndTag } = require("./fixtures/utils.helper");

describe("getTodoText():", () => {
  test("starts with config.tag", () => {
    startsWithTag(todoText, config);
  });

  test("ends with config.endTag", () => {
    endsWithEndTag(todoText, config);
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
    includesTodoItems(todoText, todoList.length);
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
    expect(outFileContents.trim()).toBe(todoText.trim());
  });

  test("appends todoText to an existing file that does not have a 'to do' list & preserves preceding sections", async () => {
    const outFile = resolve(varDir, "precedingSections.md");
    writeToDoToFile(outFile, precedingSections);
    save(todoList, { ...config, outFile });

    const outFileContents = await readFile(outFile, { encoding: "utf-8" });
    doesNotStartWithTag(outFileContents, config);
    endsWithEndTag(outFileContents, config);
  });

  test("preserves preceding and subsequent sections of an outFile that contains a to do list", async () => {
    const outFile = resolve(varDir, "precedingAndSubsequentSections.md");
    writeToDoToFile(outFile, `${precedingSections}\n\n${getToDoText(config, ["paragraph"])}\n\n${subsequentSections}`);

    save(todoList, { ...config, outFile });

    const outFileContents = await readFile(outFile, { encoding: "utf-8" });

    doesNotStartWithTag(outFileContents, config);
    doesNotEndWithEndTag(outFileContents, config);
    (outFileContents, config);
    includesTag(outFileContents, config);
    includesTag(outFileContents, config);
    includesTodoItems(outFileContents, todoList.length);
  });
});