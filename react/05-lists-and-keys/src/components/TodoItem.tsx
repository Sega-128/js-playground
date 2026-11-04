import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  // TODO: render a <li className="todo-item"> containing:
  //   1. <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
  //   2. <span className={todo.done ? 'todo-text done' : 'todo-text'}>{todo.text}</span>
  //   3. <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>✕</button>

  return (
    <li className="todo-item">
      <span>{todo.text}</span>
      {/* TODO: implement the full layout described above */}
    </li>
  );
}
