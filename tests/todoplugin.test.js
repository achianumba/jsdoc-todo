// /* eslint-disable */
// const { resolve } = require("path");
// const { existsSync, rmSync, mkdirSync, readFileSync } = require("fs");
// const util = require("node:util");
// const exec = util.promisify(require("node:child_process").exec);

// const tmp = resolve(__dirname, "var");
// const readme = resolve(__dirname, "README.md");

// function deleteDirectory(directory) {
//   existsSync(directory) && rmSync(directory, { recursive: true });
// }

// beforeAll(async () => {
//   // Recreate empty folder
//   deleteDirectory(tmp);
//   mkdirSync(tmp, { recursive: true });
// });

// let results;

// describe("An undefined 'todoPlugin' object in JSDoc's configuration:", () => {
//   test("Loads the default configuration.", async () => {
//     const { stderr, stdout } = await exec("pnpm run cmd:no:config");

//     if (stderr) throw stderr;

//     results = JSON.parse(
//       readFileSync(resolve(process.cwd(), "var", "cmd.helper.json"), {
//         encoding: "utf-8",
//       })
//     );

//     expect(results.loadConfig.heading).toBe("To Do");
//   });

//   test("Loads the default headingLevel", () => {
//     expect(results.loadConfig.headingLevel).toBe(2);
//   });

//   test("Loads the default outFile", () => {
//     expect(results.loadConfig.outFile).toBe(resolve("README.md"));
//   });

//   test("Loads the default tag", () => {
//     expect(results.loadConfig.tag).toBe("<!-- @todolist");
//   });

//   test("Loads the default endTag", () => {
//     expect(results.loadConfig.endTag).toBe("<!-- @endtodolist -->");
//   });
// });

// describe("createCheckbox:", () => {
//   test("Generates a Markdown checkbox", () => {
//     expect(results.unCheckedBox).toMatch(/^\-\s\[\s\]\s[0-9A-Za-z\.]+/);
//   });

//   test("Generates a checked box for strings that end with '+x'", () => {
//     expect(results.checkedBox).toMatch(/^\-\s\[x\]\s[0-9A-Za-z\.]+/);
//   });

//   test("Adds non-breaking spaces between a checkbox's string and its review link", () => {
//     expect(results.checkedBox.includes("&nbsp;-&nbsp;[review](")).toBeTruthy();
//   });

//   test("Adds a review link to the generated Markdown checkbox", () => {
//     expect(results.checkedBox).toMatch(/\[review\]\(([0-9A-Za-z\.\-\_\/])+\#L\d+\)$/);
//   });
// })
