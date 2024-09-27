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
    excludePattern: "\\.(config|test)\\.js$",
  },
  opts: {
    destination: './docs'
  }
};
