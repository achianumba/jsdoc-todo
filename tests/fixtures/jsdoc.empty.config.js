/* eslint-disable */
const { todoPlugin } = require("jsdoc-todo");

module.exports = {
  recurseDepth: 10,
  plugins: [todoPlugin],
  source: {
    include: ["fixtures"],
    exlude: [
      "coverage",
      "docs",
      "node_mdoules",
      "var"
    ],
    includePattern: "empty\\.js$",
    excludePattern: "\\.(config|test|helper|todo)\\.js$",
  },
  opts: {
    destination: './docs'
  },
  todoPlugin: {
    outFile: "var/jsdoc.config.js.md",
    heading: "JSDoc Config JS To Do",
    headingLevel: 3,
    tag: "jsdoc.config.js",
    endTag: "xyz"
  }
};
