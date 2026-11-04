import type { Todo } from '../types';
// TODO: import TodoItem from './TodoItem'

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle: _onToggle, onDelete: _onDelete }: Props) {
  // TODO: if todos.length === 0, return an empty-state paragraph:
  //   <p className="empty-state">Nothing here yet!</p>

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        // TODO: replace <li> with <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
