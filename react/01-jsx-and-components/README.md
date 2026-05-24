# Lesson 01 — JSX & Components

## Goal

Understand JSX and create your first React components.

## Theory

- **JSX** is syntactic sugar over `React.createElement` — it lets you write HTML-like markup inside JavaScript.
- A component must return **one root element**. Use `<>...</>` (Fragment) when you need a wrapper without extra DOM nodes.
- Embed JavaScript with **`{expression}`** — variables, function calls, etc.
- A **function component** is a function that returns JSX. Name components in **PascalCase**.
- Split UI into small, reusable pieces and compose them in a parent (e.g. `App`).

**Read more:**
- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Your First Component](https://react.dev/learn/your-first-component)

## Task

- [ ] Create `src/components/Header.tsx` — site title and subtitle
- [ ] Create `src/components/Main.tsx` — section with a `<ul>` of technologies from `['React', 'TypeScript', 'Vite']`
- [ ] Create `src/components/Footer.tsx` — copyright line with the current year
- [ ] Compose `Header`, `Main`, and `Footer` in `App.tsx`
- [ ] Add basic layout styles in `index.css` (flex column, `min-height: 100vh`)

## Hints

- Current year: `new Date().getFullYear()`
- Use `.map()` to render the list — we cover `key` in lesson 05

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
