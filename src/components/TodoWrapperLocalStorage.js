import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, { id: uuidv4(), task, timer: null, isEditing: false }]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const editTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const onTimeSet = (id, time) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, timer: time } : todo))
    );
  };

  const handleTimerEnd = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (window.confirm(`Did you complete the task "${todo.task}"?`)) {
      deleteTodo(id);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          onTimeSet={onTimeSet}
          handleTimerEnd={handleTimerEnd}
        />
      ))}
    </div>
  );
};
