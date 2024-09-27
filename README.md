<!-- markdownlint-disable no-trailing-punctuation -->

# JSDoc To Do

A JSDoc plugin that adds TO-DO lists/items to a project's README.md.

## Installation

```shell
npm install -D jsdoc-todo
```

## Usage

```javascript
// jsdoc.config.js

const { todoPlugin } = require("jsdoc-todo");

module.exports = {
  //...,
  todoPlugin: {
    heading: "To Do",
    headingLevel: 2,
    outFile: "README.md",
    tag: "todolist"
  }
};
```

Or if you prefer JSON:

```json
// jsdoc.config.json
{
  "todoPlugin": {
    "heading": "To Do",
    "headingLevel": 2,
    "outFile": "README.md",
    "tag": "todolist"
  }
}
```

Example

```javascript
// example.js

/**
 * @todolist
 * The below will match anything that's an instance of Object (i.e., Arrays, Maps etc.). Use `Object.prototype.toString.call(arg)` instead.
 * Don't forget to test it before your next PR.
 * Consider using Zod's `z.object(arg)` etc. for this and other validators/validations.
 */
function isObject(arg) {
  if (arg instanceof Object) {
    return true;
  }
}

/** @todo - Capitalize this and other constant identifiers +x */
const { NODE_ENV, JWT_PRIVATE_KEY } = process.env;

/**
 * @todo
 * A multi-line @todo item
 * is processed
 * as a single line.
 * Use @todolist tags if you want each line to contain a to do item.
 */
```

### Marking a task/to-do as completed.

Append `+x` to the end of the target line for in a `@todolist` or a single-line `@todo`. If you're working wiht a multiline `@todo`, append it to the end of the last line.

I'm going to look at the code anyway, so why this? We'll, it'll save you the trouble of going through all files. You could just click the review link and go to the exact line on large files.

### `todoPlugin` Configuration

| Setting        | Description                             | Type     | Default     |
| -------------- | --------------------------------------- | -------- | ----------- |
| `heading`      | "To Do" section's heading.              | `string` | `To Do`     |
| `headingLevel` | HTML heading type (1 to 6).             | `number` | `2`         |
| `outFile`      | Output file.                            | `number` | `README.md` |
| `tag`          | Marks the start of the "To Do" section. | `string` | `todolist`  |
| `endTag`       | Marks the end of the "To Do" section.   | `string` | `todolist`  |

## Development

```shell
git clone https://github.com/achianumba/jsdoc-todo.git

cd jsdoc-todo

pnpm install

pnpm run build
```

### Testing

```shell
pnpm run test
```

## Known issues

- Duplicate todo items result from improper filtering in your JSDoc config file. If you're using TypeScript, consider including either the source files' folder or the emitted files folder (but not both) to your JSDoc config's `source.exclude` field.
