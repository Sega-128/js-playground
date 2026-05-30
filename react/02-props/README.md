# Lesson 02 — Props

## Goal

Learn how to pass data into components using typed props.

## Theory

- **Props** are how a parent component passes data to a child. They are **read-only** — a child must never mutate its props.
- Destructure props in the function signature: `function Card({ title }: CardProps)`.
- Use a TypeScript **`interface`** to describe the shape of props.
- Mark optional props with **`?`**: `online?: boolean`.
- Set **default values** via destructuring: `{ size = 'md' }`.
- **`children`** is a special prop — any JSX nested inside a component tag is passed as `children`.

**Read more:**
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [TypeScript with React](https://react.dev/learn/typescript)

## Task

- [ ] Define `CardProps` and implement `Card` with `title`, `description`, and `children`
- [ ] Define `UserBadgeProps` with required `name`, `role`, and optional `online`
- [ ] Define `AvatarProps` with required `name` and optional `size` (default `'md'`)
- [ ] Show initials in `Avatar` (e.g. "Alex Chen" → "AC")
- [ ] Render team cards in `App.tsx` — pass all data via props, no hardcoded text inside child components
- [ ] Add minimal styles for cards, avatar sizes, and the online status dot

## Hints

- Initials: `name.split(' ').map((part) => part[0]).join('').toUpperCase()`
- Default size: `{ size = 'md' }` in the destructuring
- Online dot: render only when `online` is `true` — use `{online && <span ... />}`

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
