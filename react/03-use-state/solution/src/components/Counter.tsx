import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((current) => current + 1);
  const decrement = () => setCount((current) => Math.max(0, current - 1));
  const reset = () => setCount(0);

  return (
    <div className="panel counter-panel">
      <h2>Counter</h2>
      <p className="count-display">{count}</p>
      <div className="button-row">
        <button
          type="button"
          className="btn"
          onClick={decrement}
          disabled={count === 0}
        >
          −
        </button>
        <button type="button" className="btn btn-primary" onClick={increment}>
          +
        </button>
        <button type="button" className="btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
