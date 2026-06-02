// TODO: import useState from 'react'
// TODO: store count in state with useState(0)
// TODO: add increment, decrement (minimum 0), and reset handlers
// TODO: wire buttons to handlers and display the current count

export function Counter() {
  const count = 0;

  return (
    <div className="panel counter-panel">
      <h2>Counter</h2>
      <p className="count-display">{count}</p>
      <div className="button-row">
        <button type="button" className="btn" disabled>
          −
        </button>
        <button type="button" className="btn btn-primary" disabled>
          +
        </button>
        <button type="button" className="btn" disabled>
          Reset
        </button>
      </div>
    </div>
  );
}
