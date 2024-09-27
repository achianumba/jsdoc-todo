module.exports = {
  recurseDepth: 10,
  plugins: ["jsdoc-todo.js"],
  source: {
    include: ["src", "tests"],
    exclude: ["node_modules", "tests/fixtures", "var"],
    includePattern: "\\.[jt]s$",
    excludePattern: "\\.(config|helper|d)\\.[jt]s$",
  },
  opts: {
    destination: "./docs",
  },
  todoPlugin: {
    outFile: "var/jsdoc.config.js.md",
    heading: "JSDoc Config JS To Do",
    headingLevel: 3,
    tag: "jsdoc.config.js",
    endTag: "yolo"
  }
};
