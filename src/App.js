import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/dist/v4";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]); // Object destructuring
  const todoNameRef = useRef(); // useRef is a hook to hold mutable data that persists for the full lifetime of the component

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // fetch data from localstorage, convert to json
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)); // store data as string in localStorage so they persist even if page reloads
  }, [todos]);

  function toggleTodo(id) {
    // need to pass this function into TodoList.js
    const newTodos = [...todos]; // never directly modify a state variable, make a copy
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  console.log(todos);

  return (
    // FRAGMENTS: <>This is a fragment<>
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      {/* OnClick Listener */}
      <button onClick={handleAddTodo}>Add Todo</button>

      <button onClick={handleClearTodos}> Clear Completed Todos</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
