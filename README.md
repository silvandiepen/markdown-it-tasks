# markdown-it-tasks

Mostly stolen from [Revin/markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists) but recreated it in typescript, with unit tests and the option to add my own classes.

A [markdown-it](https://www.npmjs.com/package/markdown-it) plugin to create GitHub-style [task lists](https://github.com/blog/1825-task-lists-in-all-markdown-documents)

## What it does

- Builds [task/todo lists](https://github.com/blog/1825-task-lists-in-all-markdown-documents) out of markdown lists with items starting with `[ ]` or `[x]`.
- Nothing else

### Why is this useful?

When you have markdown documentation with checklists, rendering HTML checkboxes
out of the list items looks nicer than the raw square brackets.

## Example

- [ ] This is
- [ ] A task
- [x] Which is checked
- [ ] While the rest are not.

```
- [ ] This is
- [ ] A task
- [X] Which is checked
- [ ] While the rest are not.
```

## Installation

```sh
npm install markdown-it-tasks
```

## Usage

Use it the same as a normal markdown-it plugin:

```js
const md = require('markdown-it');
const tasks = require('markdown-it-tasks');

const parser = md().use(tasks);
const result = parser.render(...); // markdown string containing task list items
```

### Configuration

#### Enabling

The rendered checkboxes are disabled; to change this, pass a truthy value into
the `enabled` property of the plugin options:

```js
const parser = md().use(taskLists, { enabled: true });
```

#### Labels

If you'd like to wrap the rendered list items in a `<label>` element for UX
purposes, pass a truthy value to the `label` property of the plugin options:

```js
const parser = md().use(taskLists, { label: true });
```

To add the label after the checkbox pass a truthy value to `labelAfter` property:

```js
const parser = md().use(taskLists, {
  label: true,
  labelAfter: true,
});
```

**Note:** This option does require the `label` option to be truthy.

The options can be combined, of course.

#### Classes

By default the following classes will be added, you can alter these classes as you wish.

```js
var parser = md().use(taskLists, {
  containerClass: ".task",
  labelClass: ".task__label",
  inputClass: ".task__input",
  itemClass: ".task__item",
});
```

### Browser Usage

If you use one of the versions of this module available in `dist/` directly in
a browser by including it with a `<script>` element, it will be available
globally in `window.markdownitTaskLists`.

## Tests

```sh
npm install
npm test
```

## License

ISC
