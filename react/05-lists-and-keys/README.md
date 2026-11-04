# Lesson 05 — Lists & Keys

## Goal

Render a dynamic list of todos and filter them using `.map()`, the `key` prop, and conditional rendering.

---

## Theory

- **`.map()` for lists** — transform an array into JSX elements; React renders the result
- **`key` prop** — a stable, unique string/number on each list item; helps React identify which items changed, were added, or removed; use IDs, not array indices
- **Conditional rendering**
  - `condition && <Element />` — render only when condition is truthy
  - `condition ? <A /> : <B />` — choose between two elements
  - early `return` — return different JSX from a component based on state

**Docs:**
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Conditional Rendering](https://react.dev/learn/conditional-rendering)

---

## Task

Build a todo list with add, toggle, delete, and filter functionality.

- [ ] **`App.tsx`** — add `todos` and `filter` state; implement `addTodo`, `toggleTodo`, `deleteTodo`; compute `visibleTodos`; wire up the three components
- [ ] **`TodoForm.tsx`** — controlled input with `useState`; call `onAdd` on submit; clear the input afterward
- [ ] **`FilterBar.tsx`** — render a button for each filter (`all`, `active`, `done`) using `.map()`; highlight the active one
- [ ] **`TodoList.tsx`** — map `todos` to `<TodoItem>` elements; show an empty-state message when the list is empty
- [ ] **`TodoItem.tsx`** — checkbox, text with strikethrough when done, delete button

---

## Hints

1. For `addTodo`, use `Date.now()` as a quick unique id: `{ id: Date.now(), text, done: false }`.
2. For `toggleTodo`, never mutate state directly — return a **new array** with `.map()` and spread the changed todo: `todos.map(t => t.id === id ? { ...t, done: !t.done } : t)`.

---

## Check your work

- Adding a todo appends it to the list.
- Clicking the checkbox crosses out the text.
- The delete button removes only that item.
- Filter tabs show only the matching todos; "Nothing here yet!" appears when the filtered list is empty.
- No React key warnings in the browser console.

Compare with `solution/` when you are done.

---

## Commands

```bash
npm install
npm run dev
```

Solution:

```bash
cd solution && npm install && npm run dev
```
