// TODO: import useState from 'react'

interface Props {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd: _onAdd }: Props) {
  // TODO: add text state with useState('')

  const text = '';

  // TODO: implement handleSubmit:
  //   - prevent default
  //   - trim the text; do nothing if empty
  //   - call onAdd(text.trim())
  //   - reset text to ''

  return (
    <form className="todo-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={() => {
          // TODO: update text state
        }}
        aria-label="New todo"
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
