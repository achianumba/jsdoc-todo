import { JSDocEvent, type Dictionary, type Doclet, type Tag } from "./lib/types";
import createCheckbox from "./lib/create-checkbox";
import save from "./lib/save";
import { join } from "path";

const todoList: Array<string> = [];
const todoSeen: Array<string> = [];

function onTagged(doclet: Doclet, tag: Tag) {
  // Avoid duplicates
  if (todoSeen.includes(tag.value)) {
    return;
  }

  todoSeen.push(tag.value);

  const meta = { ...doclet.meta };
  const comment = doclet.comment;

  // Set the correct line number if a doclet spans multiple lines.
  if (comment.split("\n").length > 1) {
    const firstLineBreak = comment.indexOf("\n");
    const firstLine = comment.slice(0, firstLineBreak);

    // To do text doesn't start on the first line unlike /** @todo xyz
    if (/^\/\*{2,}( )*$/.test(firstLine)) {
      meta.lineno = ++meta.lineno;
    }

    // Skip another line if todo item/list doesn't start on the same line as the tag.
    // eslint-disable-next-line
    const startsOnSecond = /^( )*?\*( )*@todo(list)?( )+([0-9A-Za-z\ \.\-])+/;
    const subsequentLines = comment.slice(firstLineBreak + 1);

    if (!startsOnSecond.test(subsequentLines)) {
      meta.lineno = ++meta.lineno;
    }
  }

  if (tag.originalTitle == "todo") {
    todoList.push(
      createCheckbox(tag.text, meta.path, meta.filename, meta.lineno)
    );
    return;
  }

  tag.text.split("\n").forEach((line, lineIndex) => {
    //Empty lines are skipped
    if (!/^$/.test(line)) {
      // meta.lineno + lineIndex accounts for multiple lines in a to do list.
      todoList.push(
        createCheckbox(line, meta.path, meta.filename, lineIndex + meta.lineno)
      );
    }
  });
}

export function defineTags(dictionary: Dictionary) {
  dictionary.defineTag("todo", { onTagged });
  dictionary.defineTag("todolist", { onTagged });
}

function processingComplete(e: JSDocEvent) {
  save(todoList);

  // Remove todo items/lists from generated docs.
  e.doclets = e.doclets.filter((d: Doclet): boolean => {
    // eslint-disable-next-line
    const toDoDocletRegex = /\/\*\*(\n|\s)?\ *\*\ @todo(list)?/;
    return d.comment.length > 0 && !toDoDocletRegex.test(d.comment);
  });
}

export const handlers = { processingComplete };

/**
 * @todo just an example +x
 */
export const todoPlugin = join("node_modules", "jsdoc-todo", "jsdoc-todo.js");
export default todoPlugin;
