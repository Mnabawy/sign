import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const tasks = [
  { id: "todo-1", name: "code", completed: false },
  { id: "todo-2", name: "eat", completed: true },
  { id: "todo-3", name: "sleep", completed: true },
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>,
  document.getElementById("root")
);
