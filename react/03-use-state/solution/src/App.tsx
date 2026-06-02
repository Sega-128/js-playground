import { useState } from 'react';
import { Counter } from './components/Counter';
import { ThemeToggle } from './components/ThemeToggle';

type Theme = 'light' | 'dark';

export function App() {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="page-header">
        <h1>useState Playground</h1>
        <p>Lesson 03 — State</p>
      </header>
      <main className="panels">
        <Counter />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </main>
    </div>
  );
}
