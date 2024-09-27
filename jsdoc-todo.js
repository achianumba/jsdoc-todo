"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoPlugin = exports.handlers = void 0;
exports.defineTags = defineTags;
const create_checkbox_1 = __importDefault(require("./lib/create-checkbox"));
const save_1 = __importDefault(require("./lib/save"));
const path_1 = require("path");
const todoList = [];
const todoSeen = [];
function onTagged(doclet, tag) {
    if (todoSeen.includes(tag.value)) {
        return;
    }
    todoSeen.push(tag.value);
    const meta = { ...doclet.meta };
    const comment = doclet.comment;
    if (comment.split("\n").length > 1) {
        const firstLineBreak = comment.indexOf("\n");
        const firstLine = comment.slice(0, firstLineBreak);
        if (/^\/\*{2,}( )*$/.test(firstLine)) {
            meta.lineno = ++meta.lineno;
        }
        const startsOnSecond = /^( )*?\*( )*@todo(list)?( )+([0-9A-Za-z\ \.\-])+/;
        const subsequentLines = comment.slice(firstLineBreak + 1);
        if (!startsOnSecond.test(subsequentLines)) {
            meta.lineno = ++meta.lineno;
        }
    }
    if (tag.originalTitle == "todo") {
        todoList.push((0, create_checkbox_1.default)(tag.text, meta.path, meta.filename, meta.lineno));
        return;
    }
    tag.text.split("\n").forEach((line, lineIndex) => {
        if (!/^$/.test(line)) {
            todoList.push((0, create_checkbox_1.default)(line, meta.path, meta.filename, lineIndex + meta.lineno));
        }
    });
}
function defineTags(dictionary) {
    dictionary.defineTag("todo", { onTagged });
    dictionary.defineTag("todolist", { onTagged });
}
function processingComplete(e) {
    (0, save_1.default)(todoList);
    e.doclets = e.doclets.filter((d) => {
        const toDoDocletRegex = /\/\*\*(\n|\s)?\ *\*\ @todo(list)?/;
        return d.comment.length > 0 && !toDoDocletRegex.test(d.comment);
    });
}
exports.handlers = { processingComplete };
exports.todoPlugin = (0, path_1.join)("node_modules", "jsdoc-todo", "todoplugin.js");
exports.default = exports.todoPlugin;
