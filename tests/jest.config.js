/* eslint-disable */
const { resolve } = require('path');
const { readdir } = require("fs/promises");
const { existsSync, rmSync } = require("fs");

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    '**/node_modules/jsdoc-todo/lib/*.js',
    '**/node_modules/jsdoc-todo/jsdoc-todo.js'
  ],
  coveragePathIgnorePatterns: ["/node_modules/", '!**/node_modules/jsdoc-todo/lib/**/*.js'],
  verbose: true,
  globals: {
    varDir: resolve(process.cwd(), "var"),
    readme: resolve(process.cwd(), "README.md"),
    cleanup: async function({ readme, varDir }) {
      const varDirContents = (await readdir(varDir)).map(f => resolve(varDir, f));

      const files = [
        ...varDirContents,
        readme
      ];

      files.forEach((f) => {
        existsSync(f) && rmSync(f, { recursive: true, force: true });
      });
    }
  },
  globalSetup: "./jest.setup.config.js",
  globalTeardown: "./jest.teardown.config.js"
};

module.exports = config;
