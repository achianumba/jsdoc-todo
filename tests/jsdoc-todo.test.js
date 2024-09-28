/* eslint-disable */
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const { resolve } = require("path");
const { readFile, writeFile } = require("fs/promises");
const {  existsSync } = require("fs");
const { config, checkboxRegex, precedingSections, subsequentSections, todoText, userConfigJS } = require("./fixtures/utils.helper");

// test("Running jsdoc with an empty to do list does not write to oconfig.outFile", async () => {
//   const { stdout } = await exec("pnpm run jsdoc:empty:config");
//   expect(stdout.includes("No 'to do' items/lists found!")).toBeTruthy();
//   expect(existsSync(readme)).toBeFalsy();
// });

// describe("Running jsdoc WITHOUT a populated todoPlugin object in the config file:", () => {
//   test("creates a README.md file if it doesn't exist", async () => {
//     expect(existsSync(readme)).toBeFalsy();
//     await exec("pnpm run jsdoc:no:config");
//     expect(existsSync(readme)).toBeTruthy();
//   });

//   test("writes 'to do' items to the README.md file", async () => {
//     const readmeContents = await readFile(readme, { encoding: "utf-8" });
//     expect(readmeContents.includes(config.tag)).toBeTruthy();
//     expect(readmeContents.includes(config.endTag)).toBeTruthy();
//     expect(readmeContents.match(checkboxRegex)).toHaveLength(7);
//   });

//   test("preserves preceding sections of the README.md file", async () => {
//     await writeFile(readme, precedingSections, { encoding: "utf-8" });
//     await exec("pnpm run jsdoc:no:config");
//     const readmeContents = (await readFile(readme, { encoding: "utf8"})).trim();
//     expect(readmeContents.startsWith(config.tag.trim())).toBeFalsy();
//     expect(readmeContents.endsWith(config.endTag)).toBeTruthy();
//   });

//   test("preserves preceding and subsequent sections of the README.md file", async () => {
//     await writeFile(readme, `${precedingSections}${todoText}${subsequentSections}`, { encoding: "utf-8" });
//     await exec("pnpm run jsdoc:no:config");
//     const readmeContents = (await readFile(readme, { encoding: "utf8"})).trim();
//     expect(readmeContents.startsWith(config.tag.trim())).toBeFalsy();
//     expect(readmeContents.includes(config.tag.trim())).toBeTruthy();
//     expect(readmeContents.includes(config.endTag.trim())).toBeTruthy();
//     expect(readmeContents.match(checkboxRegex)).toHaveLength(7);
//     expect(readmeContents.endsWith(config.endTag.trim())).toBeFalsy();
//   });
// });

describe("Running jsdoc WITH a populated todoPlugin object in a JS config file:", () => {
  test("creates todoPlugin.outFile if it doesn't exist", async () => {
    expect(existsSync(userConfigJS.outFile)).toBeFalsy();
    await exec("pnpm run jsdoc:js:config");
    expect(existsSync(userConfigJS.outFile)).toBeTruthy();
  });

  test("writes 'to do' items to the todoPlugin.outFile file", async () => {
    const outFileContents = (await readFile(userConfigJS.outFile, { encoding: "utf-8" })).trim();
    expect(outFileContents.includes(userConfigJS.tag.trim())).toBeTruthy();
    expect(outFileContents.includes(userConfigJS.endTag.trim())).toBeTruthy();
    expect(outFileContents.match(checkboxRegex)).toHaveLength(7);
  });

  test("preserves preceding sections of the todoPlugin.outFile file", async () => {
    await writeFile(userConfigJS.outFile, precedingSections, { encoding: "utf-8" });
    await exec("pnpm run jsdoc:js:config");
    const outFileContents = (await readFile(userConfigJS.outFile, { encoding: "utf8"})).trim();
    expect(outFileContents.startsWith(userConfigJS.tag.trim())).toBeFalsy();
    expect(outFileContents.endsWith(userConfigJS.endTag.trim())).toBeTruthy();
  });

  test("preserves preceding and subsequent sections of the todoPlugin.outFile file", async () => {
    await writeFile(userConfigJS.outFile, `${precedingSections}${todoText}${subsequentSections}`, { encoding: "utf-8" });
    await exec("pnpm run jsdoc:js:config");
    const outFileContents = (await readFile(userConfigJS.outFile, { encoding: "utf8"})).trim();
    expect(outFileContents.startsWith(userConfigJS.tag.trim())).toBeFalsy();
    expect(outFileContents.includes(userConfigJS.tag.trim())).toBeTruthy();
    expect(outFileContents.includes(userConfigJS.endTag.trim())).toBeTruthy();
    expect(outFileContents.match(checkboxRegex)).toHaveLength(7);
    expect(outFileContents.endsWith(userConfigJS.endTag.trim())).toBeFalsy();
  });
});