/* eslint-disable */
module.exports = {
  recurseDepth: 10,
  plugins: ["jsdoc-todo.js"],
  source: {
    include: ["tests"],
    exclude: ["docs", "lib", "node_modules", "src" ],
    includePattern: "\\.js$",
    excludePattern: "\\.(config|helper|d)\\.[jt]s$",
  },
  opts: {
    destination: "./docs",
  },
  todoPlugin: {
    tag: "actualToDolist"
  }
};
