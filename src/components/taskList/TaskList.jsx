import React from "react";
import "./taskList.css";

const taskList = ({ taskList, deleteTask, editTask, handleFinishedTask }) => {
  return (
    <ul className="taskList">
      {taskList.map((TASK) => {
        return (
          <li key={TASK.id} className="Task">
            <div className="left">
              <input
                type="checkbox"
                checked={TASK.done}
                onChange={(e) => handleFinishedTask(TASK.id, e.target.checked)}
              />
              <span
                style={{
                  textDecoration: TASK.done ? "line-through" : "none",
                  textDecorationColor: TASK.done ? "red" : "none",
                }}
                className="taskcontent"
              >
                {TASK.task}
              </span>
            </div>
            <div className="right">
              <span
                className="material-symbols-outlined"
                onClick={() => editTask(TASK)}
              >
                edit_note
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => deleteTask(TASK.id)}
              >
                delete
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default taskList;
