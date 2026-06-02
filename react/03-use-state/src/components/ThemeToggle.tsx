export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

// TODO: wire the button onClick to onToggle
// TODO: update button label to show the opposite theme (e.g. "Switch to dark mode")

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div className="panel theme-panel">
      <h2>Theme</h2>
      <p className="theme-label">Current: {theme}</p>
      <button type="button" className="btn" onClick={onToggle} disabled>
        Switch theme
      </button>
    </div>
  );
}
