import { Counter } from './components/Counter';
import { ThemeToggle } from './components/ThemeToggle';

// TODO: import useState from 'react'
// TODO: add theme state with useState<'light' | 'dark'>('light')
// TODO: create toggleTheme handler that switches between 'light' and 'dark'
// TODO: apply className "dark" on the app wrapper when theme is 'dark'

export function App() {
  return (
    <div className="app">
      <header className="page-header">
        <h1>useState Playground</h1>
        <p>Lesson 03 — State</p>
      </header>
      <main className="panels">
        <Counter />
        <ThemeToggle theme="light" onToggle={() => {}} />
      </main>
    </div>
  );
}
