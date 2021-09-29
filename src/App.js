import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";

// filter object with key filter method 
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Complteted: task => task.completed,
};

// filter array with filter values of method 
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newList = tasks.filter(task => task.id !== id);
    setTasks(newList);
  }

  function markCompleted(id) {
    const newList = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newList);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasks);
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const renderList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        key={task.id}
        name={task.name}
        completed={task.completed}
        deleteTask={deleteTask}
        editTask={editTask}
        markCompleted={markCompleted}
      />
    ));

  const remainingTasks = (
    <h1>
      {tasks.length} {tasks.length > 1 ? "tasks" : "task"} remaining
    </h1>
  );

  return (
    <div className="App">
      <h1>add new task</h1>
      <Form addTask={addTask} />
      {remainingTasks}
      show only:
      {filterList}
      <h2>what needs to be done</h2>
      {renderList}
    </div>
  );
}

export default App;
