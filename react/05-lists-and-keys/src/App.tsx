// TODO: import useState from 'react'
// TODO: import Filter and Todo types from './types'
// TODO: import TodoForm, TodoList, FilterBar components

import type { Todo, Filter } from './types';

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: 'Learn .map() and key prop', done: true },
  { id: 2, text: 'Understand conditional rendering', done: false },
  { id: 3, text: 'Build the filter tabs', done: false },
];

export function App() {
  // TODO: add todos state with useState<Todo[]>(INITIAL_TODOS)
  // TODO: add filter state with useState<Filter>('all')

  const todos = INITIAL_TODOS;
  const filter: Filter = 'all';

  // TODO: compute visibleTodos — filter todos by current filter value:
  //   'all'    → all todos
  //   'active' → todos where done === false
  //   'done'   → todos where done === true
  const visibleTodos = todos;

  // TODO: implement addTodo(text: string) — append a new Todo with a unique id, done: false
  const addTodo = (_text: string) => {
    // hint: use Date.now() as the id
  };

  // TODO: implement toggleTodo(id: number) — flip the done field of the matching todo
  const toggleTodo = (_id: number) => {
    // hint: map over todos and return a new array
  };

  // TODO: implement deleteTodo(id: number) — remove the todo with the given id
  const deleteTodo = (_id: number) => {
    // hint: use .filter()
  };

  return (
    <div className="app">
      <header className="page-header">
        <h1>Todo List</h1>
        <p>Lesson 05 — Lists &amp; Keys</p>
      </header>

      <main className="todo-layout">
        {/* TODO: render <TodoForm onAdd={addTodo} /> */}

        {/* TODO: render <FilterBar filter={filter} onChange={setFilter} /> */}

        {/* TODO: render <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} /> */}

        {/* Temporary placeholder — remove once components are added */}
        <p style={{ color: '#999' }}>
          Components not rendered yet. Complete the TODOs above.
        </p>
        <p style={{ color: '#999' }}>Active filter: <strong>{filter}</strong></p>
        <ul>
          {visibleTodos.map((todo) => (
            // TODO: replace with <TodoItem> inside <TodoList>
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
