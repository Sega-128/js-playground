import { useState } from 'react';
import type { Todo, Filter } from './types';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: 'Learn .map() and key prop', done: true },
  { id: 2, text: 'Understand conditional rendering', done: false },
  { id: 3, text: 'Build the filter tabs', done: false },
];

export function App() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [filter, setFilter] = useState<Filter>('all');

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  function addTodo(text: string) {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <header className="page-header">
        <h1>Todo List</h1>
        <p>Lesson 05 — Lists &amp; Keys</p>
      </header>

      <main className="todo-layout">
        <TodoForm onAdd={addTodo} />
        <FilterBar filter={filter} onChange={setFilter} />
        <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>
    </div>
  );
}
