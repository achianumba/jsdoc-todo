/* eslint-disable */
const { resolve } = require('path');

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
    varDir: resolve(process.cwd(), "var")
  }
};

module.exports = config;
