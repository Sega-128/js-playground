# Lesson 03 — State (useState)

## Goal

Learn how to store and update local state inside a component with `useState`.

## Theory

- **State** is data a component remembers between renders — unlike props, the component owns it and can change it.
- Declare state: `const [value, setValue] = useState(initialValue)`.
- **Never mutate state directly** — always call the setter (`setValue(newValue)` or `setValue(v => v + 1)`).
- When state changes, React **re-renders** the component so the UI stays in sync.
- For objects and arrays, create a **new copy** when updating (immutability) — covered more in later lessons.

**Read more:**
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Responding to Events](https://react.dev/learn/responding-to-events)

## Task

- [ ] Implement `Counter` with `count` state starting at `0`
- [ ] Add `+`, `−`, and `Reset` buttons wired to handlers
- [ ] Prevent the count from going below `0`
- [ ] In `App`, add `theme` state: `'light' | 'dark'`
- [ ] Pass `theme` and a toggle handler to `ThemeToggle`
- [ ] Apply the `dark` class on the app wrapper when theme is `'dark'`
- [ ] Enable the theme button in `ThemeToggle` with a label showing the target mode

## Hints

- Functional updates: `setCount(c => c + 1)` avoids stale state when updating quickly.
- Floor at zero: `setCount(c => Math.max(0, c - 1))`.
- Dynamic class: `` className={`app ${theme === 'dark' ? 'dark' : ''}`} ``.
- Theme lives in `App` so the whole page can react to `.app.dark` CSS variables.

## Check your work

Compare your result with the [`solution/`](./solution/) folder. Run it separately:

```bash
cd solution
npm i
npm run dev
```

## Commands

```bash
npm i
npm run dev
```

Open the URL shown in the terminal (default: http://localhost:5173).
