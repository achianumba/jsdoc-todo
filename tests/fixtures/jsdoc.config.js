// const { todoPlugin } = require("jsdoc-todo");

module.exports = {
  recurseDepth: 10,
  // plugins: [todoPlugin],
  source: {
    include: ["fixtures"],
    exlude: [
      "coverage",
      "docs",
      "node_mdoules",
      "var"
    ],
    excludePattern: "\\.(config|test|helper)\\.js$",
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
