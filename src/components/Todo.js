import React, { useState } from "react";

export default function Todo(props) {
  const [newName, setNewname] = useState("");
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setEditing(false)
  }

  const editTemplate = (
    <div>
      <form onSubmit={ handleSubmit}>
        <label>new name for {props.name}</label>
        <input
          id={props.id}
          type="text"
          value={newName}
          onChange={e => setNewname(e.target.value)}
        />
        <button type="button" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );

  const viewTemplate = (
    <div>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.markCompleted(props.id)}
      />
      <span>{props.name}</span>
      <div>
        <button onClick={() => setEditing(true)}>
          <span>Edit</span>
        </button>
        <button onClick={() => props.deleteTask(props.id)}>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  return isEditing ? editTemplate : viewTemplate;
}
