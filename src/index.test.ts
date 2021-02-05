import Tasks from "./";
import MarkdownIt from "markdown-it";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe("Run Markdown", () => {
  it("Should run Markdown It correctly", () => {
    const md = new MarkdownIt();

    const input = `# My first file`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should run Markdown It with Tasks correctly", () => {
    const md = new MarkdownIt();
    md.use(Tasks);

    const input = `# My first file`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should create a task list", () => {
    const md = new MarkdownIt();
    md.use(Tasks);

    const input = `# My first file

- [ ] This
- [ ] Is A
- [ ] Basic list
`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
<ul class="task-list">
<li class="task-list__item"><input class="task-list__input" type="checkbox" disabled> This</li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" disabled> Is A</li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" disabled> Basic list</li>
</ul>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should create a task list with checked elements", () => {
    const md = new MarkdownIt();
    md.use(Tasks);

    const input = `# My first file

- [X] This
- [x] Is A
- [X] Basic list
`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
<ul class="task-list">
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled> This</li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled> Is A</li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled> Basic list</li>
</ul>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should create a task list with checked elements and enabled", () => {
    const md = new MarkdownIt();
    md.use(Tasks, { enabled: true });

    const input = `# My first file

- [X] This
- [x] Is A
- [X] Basic list
`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
<ul class="task-list">
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled> This</li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled> Is A</li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled> Basic list</li>
</ul>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should create a task list with wrapped labels", () => {
    const md = new MarkdownIt();
    md.use(Tasks, {
      label: true,
    });

    const input = `# My first file

- [X] This
- [x] Is A
- [X] Basic list
`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
<ul class="task-list">
<li class="task-list__item"><label class="task-list__label"><input class="task-list__input" type="checkbox" checked disabled> This</label></li>
<li class="task-list__item"><label class="task-list__label"><input class="task-list__input" type="checkbox" checked disabled> Is A</label></li>
<li class="task-list__item"><label class="task-list__label"><input class="task-list__input" type="checkbox" checked disabled> Basic list</label></li>
</ul>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should create a task list with labels in the end", () => {
    const md = new MarkdownIt();
    md.use(Tasks, {
      label: true,
      labelAfter: true,
    });

    const input = `# My first file

  - [X] This
  - [x] Is A
  - [X] Basic list
  `;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
<ul class="task-list">
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled id="task-list__item--4999000"><label class="task-list__label" for="task-list__item--4999000">This</label></li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled id="task-list__item--4999000"><label class="task-list__label" for="task-list__item--4999000">Is A</label></li>
<li class="task-list__item"><input class="task-list__input" type="checkbox" checked disabled id="task-list__item--4999000"><label class="task-list__label" for="task-list__item--4999000">Basic list</label></li>
</ul>
`;

    expect(result).toStrictEqual(output);
  });

  it("Should create a task list with labels in the beginning", () => {
    const md = new MarkdownIt();
    md.use(Tasks, {
      label: true,
      labelAfter: false,
      labelBefore: true,
    });

    const input = `# My first file

- [X] This
- [x] Is A
- [X] Basic list
`;
    const result = md.render(input);
    const output = `<h1>My first file</h1>
<ul class="task-list">
<li class="task-list__item"><label class="task-list__label" for="task-list__item--4999000">This</label><input class="task-list__input" type="checkbox" checked disabled id="task-list__item--4999000"></li>
<li class="task-list__item"><label class="task-list__label" for="task-list__item--4999000">Is A</label><input class="task-list__input" type="checkbox" checked disabled id="task-list__item--4999000"></li>
<li class="task-list__item"><label class="task-list__label" for="task-list__item--4999000">Basic list</label><input class="task-list__input" type="checkbox" checked disabled id="task-list__item--4999000"></li>
</ul>
`;

    expect(result).toStrictEqual(output);
  });
});