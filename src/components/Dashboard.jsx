import { useContext, useEffect, useState } from "react";
import { Auth, Color, Language } from "../App";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  deleteData,
  //addData,
  getTaskData,
  putData
} from "../services";
import FormEditAndCreateTask from "./FormEditAndCreateTask";
import Notes from "./Notes";
import Timer from "./Timer";
import Audios from "./Audios";
import Bot from "./Bot";

function Dashboard() {
  const { appcolor } = useContext(Color);
  const { id } = useContext(Auth);
  const { dictionary, language } = useContext(Language);
  const [openTask, setOpenTask] = useState(false); // Open btn day
  const [dataTask, setDataTask] = useState([]);
  const [selectTask, setSelectTask] = useState(); // Indicates that a task is to be edited
  const [addTask, setAddTask] = useState(false); // Indicates that a task is to be added
  const [editTask, setEditTask] = useState(false); // Indicates that a task is to be added
  const [openWeek, setOpenWeek] = useState(true);
  const [monday, setMonday] = useState([]);
  const [message, setMessage] = useState('');
  const [tool, setTool] = useState('');
  //const [tuesday, setTuesday] = useState([]);
  //const [wednesday, setWednesday] = useState([]);
  //const [thursday, setThursday] = useState([]);
  //const [friday, setFriday] = useState([]);
  //const [saturday, setSaturday] = useState([]);
  //const [sunday, setSunday] = useState([]);

  //functions
  const handleClickOpenClose = () => {
    setOpenTask(!openTask);
  };
  const handleClickOpenCloseWeek = () => {
    setOpenWeek(!openWeek);
    console.log(openWeek)
  };
  const handleClickSelectTask = (e) => {
    const task = dataTask.find((el) => el._id.includes(e.target.id));
    setSelectTask(task);
    setEditTask(!editTask);
  };

  const fetchTask = async () => {
    const endpoint = `user/${id._id}/tasks`;

    try {
      const response = await getTaskData(endpoint);
      //console.log(response);
      setDataTask(response);

      const mondayTask = response.filter(
        (task) =>
          task.task_days.includes("monday") || task.task_days.includes("lunes")
      );
      setMonday(mondayTask);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (e) => {
    const id = e.target.id;
    const endpoint = `task/${id}`;
    try {
      const response = await deleteData(endpoint);
      console.log(response);
      setMessage(dictionary[language].dashboard_success_delete)

      setTimeout(() => {
        setMessage('');
      }, 1200);

    } catch (err) {
      console.log(err)
      setMessage(dictionary[language].dashboard_error);
      setTimeout(() => {
        setMessage("");
      }, 1200);

    }
  }

  const handleCompleteTask = async (e) => {
    const id = e.target.id;
    const endpoint = `task/${id}`;

    try {
      const findTask = dataTask.find((task) => task._id === id).task_completed;
      const boolean = findTask === true ? false : true;
      const data = { task_completed: boolean};
      //console.log(id, findTask);
      console.log(id, endpoint, "findTask", findTask, boolean, data);
      const res = await putData(endpoint, data);
      console.log(res);
    } catch (err) {
      console.log(err)
    }
  }
  const selectTools = (e, tool) => {
    console.log(e.target, tool)
    setTool(tool);
    setEditTask(false)
    setAddTask(false);
  }

  useEffect(() => {
    fetchTask();
    //console.log('ver si se actualiza despues de put', monday)
  }, [id, monday]);

  useEffect(() => {}, [dataTask]);
  useEffect(() => {
    //console.log( "selecttask", selectTask);
  }, [selectTask]);

  useEffect(() => {
    //console.log(monday);
  }, [monday]);
   
  return (
    <>
      <div className={`dashboard ${appcolor}`}>
        <h1>
          {dictionary[language].dashboard_h1}
          {id.username}
        </h1>
        <section className={`week-container ${openWeek ? "open" : "close"}`}>
          {/**map para cada día */}
          <section className={`day-container ${openTask ? "open" : "close"}`}>
            <div className="header-week">
              <p>{dictionary[language].dashboard_monday}</p>
              <section className="task-num">
                <p className="task-num">{monday.length}</p>
                <small>{dictionary[language].dashboard_tasks}</small>
              </section>
              <div className="span-container">
                <span
                  className={`icon-open ${
                    openTask ? "icon-arrow-open" : null
                  }  `}
                  onClick={handleClickOpenClose}
                >
                  {openTask ? (
                    <i className="bi bi-chevron-compact-down"></i>
                  ) : (
                    <i className="bi bi-chevron-compact-up"></i>
                  )}
                </span>
              </div>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {monday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour > 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed ? "complete" : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
                          <p>{task.task_hour}</p>
                        </div>
                        <div className="task-icons">
                          <i
                            className="bi bi-check2"
                            id={task._id}
                            onClick={handleCompleteTask}
                          ></i>
                          <i
                            className="bi bi-pencil-square"
                            id={task._id}
                            onClick={handleClickSelectTask}
                          ></i>
                          <i
                            className="bi bi-trash3"
                            id={task._id}
                            onClick={handleDeleteTask}
                          ></i>
                        </div>

                        <div
                          className={`dashboard-priority ${
                            (task.task_priority === "alta" ||
                              task.task_priority === "hight") &&
                            "alta"
                          } ${
                            (task.task_priority === "media" ||
                              task.task_priority === "medium") &&
                            "media"
                          } ${
                            (task.task_priority === "baja" ||
                              task.task_priority === "low") &&
                            "baja"
                          }`}
                        >
                          <i className="bi bi-circle-fill"></i>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <hr />
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-alt-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {monday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour > 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p>{task.task_name}</p>
                          <p>{task.task_hour}</p>
                        </div>
                        <div className="task-icons">
                          <i
                            className="bi bi-check2"
                            id={task._id}
                            onClick={handleCompleteTask}
                          ></i>
                          <i
                            className="bi bi-pencil-square"
                            id={task._id}
                            onClick={handleClickSelectTask}
                          ></i>
                          <i
                            className="bi bi-trash3"
                            id={task._id}
                            onClick={handleDeleteTask}
                          ></i>
                        </div>

                        <div
                          className={`dashboard-priority ${
                            (task.task_priority === "alta" ||
                              task.task_priority === "hight") &&
                            "alta"
                          } ${
                            (task.task_priority === "media" ||
                              task.task_priority === "medium") &&
                            "media"
                          } ${
                            (task.task_priority === "baja" ||
                              task.task_priority === "low") &&
                            "baja"
                          }`}
                        >
                          <i className="bi bi-circle-fill"></i>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <hr />
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-moon-stars-fill"></i>
                </span>
                <div className="task-list">
                  {monday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour > 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p>{task.task_name}</p>
                          <p>{task.task_hour}</p>
                        </div>
                        <div className="task-icons">
                          <i className="bi bi-check2"></i>
                          <i
                            className="bi bi-pencil-square"
                            id={task._id}
                            onClick={handleClickSelectTask}
                          ></i>
                          <i className="bi bi-trash3"></i>
                        </div>

                        <div
                          className={`dashboard-priority ${
                            (task.task_priority === "alta" ||
                              task.task_priority === "hight") &&
                            "alta"
                          } ${
                            (task.task_priority === "media" ||
                              task.task_priority === "medium") &&
                            "media"
                          } ${
                            (task.task_priority === "baja" ||
                              task.task_priority === "low") &&
                            "baja"
                          }`}
                        >
                          <i className="bi bi-circle-fill"></i>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** icon add and open/close day  */}
          <div className="week-container-icons">
            <i
              className="bi bi-plus plus"
              onClick={() => {
                setSelectTask("");
                setAddTask(!addTask);
              }}
            ></i>
            <span className={`icons-show`} onClick={handleClickOpenCloseWeek}>
              {openWeek ? (
                <i className="bi bi-eye"></i>
              ) : (
                <i className="bi bi-eye-slash"></i>
              )}
            </span>
            <button className="week-container-icons-clean">Clean</button>
          </div>
          {/** icon add and open/close day  */}
        </section>

        <div className="screen">
          {message ? <span className="message">{message}</span> : null}
          <div className="tools">
            {/** Edit task section**/}
            {(editTask || addTask) && (
              <FormEditAndCreateTask task={selectTask} />
            )}
            {/** btn close edit section **/}
            {(editTask || addTask) && (
              <button
                onClick={() =>
                  editTask ? setEditTask(!editTask) : setAddTask(!addTask)
                }
                className="close-editCreate"
              >
                {dictionary[language].form_btn_close_edit_create}
              </button>
            )}
            {tool === "notes" ? (
              <Notes dictionary={dictionary} language={language} />
            ) : tool === "timer" ? (
              <Timer />
            ) : tool === "audios" ? (
              <Audios />
            ) : tool === "bot" ? (
              <Bot />
            ) : null}
            {/** btn close edit section **/}
            {/** Notes section**/}
          </div>
          {/** Lateral Menu */}
          <div className="nav-tools">
            <div className="circle">
              <i
                className="bi bi-file-earmark-text"
                onClick={(e) => selectTools(e, "notes")}
              ></i>
            </div>
            <div className="circle">
              <i
                className="bi bi-hourglass-top"
                onClick={(e) => selectTools(e, "timer")}
              ></i>
            </div>
            <div className="circle">
              <i
                className="bi bi-mic-fill"
                onClick={(e) => selectTools(e, "audios")}
              ></i>
            </div>
            <div className="circle">
              <i
                className="bi bi-robot"
                onClick={(e) => selectTools(e, "bot")}
              ></i>
            </div>
          </div>
          {/** Lateral Menu */}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
