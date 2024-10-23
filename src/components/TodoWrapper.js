import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, { id: uuidv4(), task, timer: null, completed: false }]);
  };

  const completeTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo)));
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const onTimeSet = (id, time) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, timer: time } : todo))
    );
  };

  const handleTimerEnd = (id) => {
    completeTodo(id);
  };

  return (
    <div className="TodoWrapper">
      <h1>Productive Todo App </h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          onTimeSet={onTimeSet}
          handleTimerEnd={handleTimerEnd}
        />
      ))}
    </div>
  );
};
