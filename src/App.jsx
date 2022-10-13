import { useState } from "react";
import "./App.css";

import TaskList from "./components/taskList/TaskList";

const taskContent = [
  { id: 0, task: "buy a burger and learn to love", done: false },
  { id: 1, task: "visit zimbabwe", done: false },
  { id: 2, task: "If not working, let it go", done: false },
];

let nextID = 3;

const App = () => {
  const [tasks, setTasks] = useState(taskContent);
  const [inputText, setInputText] = useState("");

  const [btnText, setBtnText] = useState("Add");
  const [editedID, setEditedID] = useState(0);

  /* Logic to deleteTask */
  const deleteTask = (TaskId) => {
    setTasks([...tasks].filter((task) => task.id !== TaskId));
  };

  /*Logic to addTask */
  const addTask = () => {
    if (btnText === "Add") {
      const newTask = {
        id: nextID++,
        task: inputText,
        done: false,
      };
      setTasks([newTask, ...tasks]);
      setInputText("");
    } else if (btnText === "save") {
      setInputText("");
      setTasks(
        [...tasks].map((currentTask) => {
          if (currentTask.id === editedID) {
            setInputText("");
            setBtnText("add");
            return { ...currentTask, task: inputText };
          } else {
            setInputText("");
            setBtnText("add");
            return currentTask;
          }
        })
      );
    }
  };

  // logic for Keyup
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  //Logic to editTask
  const editTask = (TASK) => {
    const taskContent = TASK.task;
    setInputText(taskContent);
    setBtnText("save");

    setEditedID(TASK.id);
  };

  //Change Input value
  const handleInputTextandBtn = (e) => {
    setInputText(e.target.value);
  };
  //ClerAll logic
  const deleteAllTask = () => {
    setTasks([...tasks].filter((task) => task.id === task.length));
  };

  const handleFinishedTask = (TaskId, TaskStatus) => {
    setTasks(
      [...tasks].map((currentTask) => {
        if (currentTask.id === TaskId) {
          return { ...currentTask, done: TaskStatus };
        } else {
          return currentTask;
        }
      })
    );
  };
  return (
    <div className="app">
      <h2 className="title">Task Tracker</h2>

      <main>
        <header>
          <label htmlFor="task">add your task 🍪</label>
          <div className="inputContainer">
            <input
              type="text"
              value={inputText}
              onChange={handleInputTextandBtn}
              onKeyUp={handleKeyUp}
            />
            <button
              className="addBtn"
              disabled={inputText.length > 0 ? false : true}
              onClick={addTask}
            >
              {btnText}
            </button>
          </div>
        </header>

        <div className="tasksContainer">
          <h3 className="tasks">Tasks</h3>
          {tasks.length > 0 ? (
            <div className="tasksMainContainer">
              <TaskList
                taskList={tasks}
                deleteTask={deleteTask}
                editTask={editTask}
                handleFinishedTask={handleFinishedTask}
              />
            </div>
          ) : (
            <div className="emptyNote">No task to show</div>
          )}
        </div>

        <footer>
          <p>
            You have {[...tasks].filter((task) => task.done === false).length}{" "}
            {""} uncompleted task()
          </p>
          {tasks.length > 0 ? (
            <button onClick={deleteAllTask}>Clear all</button>
          ) : (
            ""
          )}
        </footer>
      </main>
    </div>
  );
};

export default App;
