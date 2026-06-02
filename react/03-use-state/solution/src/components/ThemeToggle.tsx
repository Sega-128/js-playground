export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div className="panel theme-panel">
      <h2>Theme</h2>
      <p className="theme-label">Current: {theme}</p>
      <button type="button" className="btn" onClick={onToggle}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  );
}
