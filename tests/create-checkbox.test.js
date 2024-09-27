/* eslint-disable */
const { checked, unchecked, checkedBox, uncheckedBox } = require("./fixtures/checkbox.helper");

describe("createCheckbox():", () => {
  test("Returns a checked-box for todo items that end with +x", () => {
    expect(checkedBox())
      .toBe(`- [x] ${checked.todo.slice(0, checked.todo.indexOf("+x")).trim()}&nbsp;-&nbsp;[review](${checked.filePath.slice(1)}/${checked.filename}#L${checked.lineNumber})`);
  });

  test("Returns a unchecked-box for todo items that end with +x", () => {
    expect(uncheckedBox())
      .toBe(`- [ ] ${unchecked.todo.trim()}&nbsp;-&nbsp;[review](${unchecked.filePath.slice(1)}/${unchecked.filename}#L${unchecked.lineNumber})`);
  });
});