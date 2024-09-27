export function createCheckbox(todo: string, filePath: string, filename: string, lineNumber: number): string {
  let todoItem = todo.replaceAll("\n", " ");
  const checked = todo.endsWith("+x");
  const checkbox = `- [${checked ? "x" : " "}]`;

  if (checked) {
    todoItem = todoItem.slice(0, todoItem.indexOf("+x")).trim()
  }

  let relativePath = filePath.replace(process.cwd(), "");

  if (relativePath.length > 1) {
    relativePath = relativePath.slice(1);
  }

  const link = `[review](${relativePath}${relativePath.length ? "/" : ""
    }${filename}#L${lineNumber})`;

  return `${checkbox} ${todoItem}&nbsp;-&nbsp;${link}`;
}

export default createCheckbox;
