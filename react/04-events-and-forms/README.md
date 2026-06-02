# Lesson 04 — Events & Forms

## Goal

Handle user input with controlled form fields, event handlers, and a live preview of entered values.

## Theory

- **Synthetic events** — React wraps browser events; handlers receive a `SyntheticEvent` (e.g. `FormEvent`, `ChangeEvent`).
- **`onChange`** — fires when an input value changes; read the new value from `e.target.value`.
- **`onSubmit`** — fires when the user submits a `<form>`; call **`e.preventDefault()`** to stop a full page reload.
- **Controlled inputs** — React owns the value: `value={form.name}` plus `onChange` that updates state. The input always reflects state.
- **Object state** — update one field immutably: `setForm((prev) => ({ ...prev, name: value }))`.

**Read more:**
- [Responding to Events](https://react.dev/learn/responding-to-events)
- [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

## Task

- [ ] Use `FormData` from `src/types.ts` (`name`, `email`, `role`)
- [ ] Store `form` and `submitted` in `App` with `useState`
- [ ] Implement `handleChange(field, value)` — spread update, reset `submitted` on edit
- [ ] Implement `handleSubmit` — `preventDefault`, set `submitted` to `true`
- [ ] Build `RegistrationForm` with 3 **controlled** fields (text, email, select)
- [ ] Wire `onChange` on each field through the `onChange` prop
- [ ] Build `FormPreview` — read-only live preview from the `form` prop
- [ ] Show `—` for empty name/email; empty-state message when nothing is entered
- [ ] Show the success banner after submit

## Hints

- Pass the field name to one handler: `onChange('name', e.target.value)`.
- Role select: `onChange('role', e.target.value)` — TypeScript accepts the union after you cast or type the handler.
- Keep form state in `App` so both `RegistrationForm` and `FormPreview` stay in sync.

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
