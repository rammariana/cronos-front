import { useCallback, useContext, useEffect, useState } from "react";
import { Auth, Color, Language } from "../App";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  deleteData,
  //addData,
  getTaskData,
  putData,
} from "../services";
import FormEditAndCreateTask from "./FormEditAndCreateTask";
import Notes from "./Notes";
import Timer from "./Timer";
import Bot from "./Bot";

function Dashboard() {
  const { appcolor } = useContext(Color);
  const { id } = useContext(Auth);
  const { dictionary, language } = useContext(Language);
  // Open days
  const [openTaskMonday, setOpenTaskMonday] = useState(false); // Open btn day

  const [openTaskTuesday, setOpenTaskTuesday] = useState(false); // Open btn day
  const [openTaskWednesday, setOpenTaskWednesday] = useState(false); // Open btn day
  const [openTaskThursday, setOpenTaskThursday] = useState(false); // Open btn day
  const [openTaskFriday, setOpenTaskFriday] = useState(false); // Open btn day
  const [openTaskSaturday, setOpenTaskSaturday] = useState(false); // Open btn day
  const [openTaskSunday, setOpenTaskSunday] = useState(false); // Open btn day
  //
  const [dataTask, setDataTask] = useState([]);
  const [selectTask, setSelectTask] = useState(); // Indicates that a task is to be edited
  const [addTask, setAddTask] = useState(false); // Indicates that a task is to be added
  const [editTask, setEditTask] = useState(false); // Indicates that a task is to be added
  const [openWeek, setOpenWeek] = useState(true);
  const [monday, setMonday] = useState([]);
  const [message, setMessage] = useState("");
  const [tool, setTool] = useState("");
  const [tuesday, setTuesday] = useState([]);
  const [wednesday, setWednesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturday, setSaturday] = useState([]);
  const [sunday, setSunday] = useState([]);

  //functions
  const handleClickOpenCloseMonday = useCallback(() => {
    setOpenTaskMonday((prev) => !prev);
  }, []);
  const handleClickOpenCloseTuesday = useCallback(() => {
    setOpenTaskTuesday((prev) => !prev);
  }, []);
  const handleClickOpenCloseWednesday = useCallback(() => {
    setOpenTaskWednesday((prev) => !prev);
  }, []);
  const handleClickOpenCloseThursday = useCallback(() => {
    setOpenTaskThursday((prev) => !prev);
  }, []);
  const handleClickOpenCloseFriday = useCallback(() => {
    setOpenTaskFriday((prev) => !prev);
  }, []);
  const handleClickOpenCloseSaturday = useCallback(() => {
    setOpenTaskSaturday((prev) => !prev);
  }, []);
  const handleClickOpenCloseSunday = useCallback(() => {
    setOpenTaskSunday((prev) => !prev);
  }, []);

  const handleClickOpenCloseWeek = () => {
    setOpenWeek(!openWeek);
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

      const mondayTask = response
        .filter(
          (task) =>
            task.task_days.includes("monday") ||
            task.task_days.includes("lunes") ||
            task.task_days.includes("Monday") ||
            task.task_days.includes("Lunes")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });

      setMonday(mondayTask);
      const tuesdayTask = response
        .filter(
          (task) =>
            task.task_days.includes("tuesday") ||
            task.task_days.includes("martes") ||
            task.task_days.includes("Tuesday") ||
            task.task_days.includes("Martes")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });
      setTuesday(tuesdayTask);
      //
      const wednesdayTask = response
        .filter(
          (task) =>
            task.task_days.includes("wednesday") ||
            task.task_days.includes("miercoles") ||
            task.task_days.includes("Wednesday") ||
            task.task_days.includes("Miercoles")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });
      setWednesday(wednesdayTask);
      //
      const thursdayTask = response
        .filter(
          (task) =>
            task.task_days.includes("thursday") ||
            task.task_days.includes("jueves") ||
            task.task_days.includes("Thursday") ||
            task.task_days.includes("Jueves")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });
      setThursday(thursdayTask);
      //
      const fridayTask = response
        .filter(
          (task) =>
            task.task_days.includes("friday") ||
            task.task_days.includes("viernes") ||
            task.task_days.includes("Friday") ||
            task.task_days.includes("Viernes")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });
      setFriday(fridayTask);
      //
      const saturdayTask = response
        .filter(
          (task) =>
            task.task_days.includes("saturday") ||
            task.task_days.includes("sabado") ||
            task.task_days.includes("Saturday") ||
            task.task_days.includes("Sabado")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });
      setSaturday(saturdayTask);
      //
      const sundayTask = response
        .filter(
          (task) =>
            task.task_days.includes("sunday") ||
            task.task_days.includes("domingo") ||
            task.task_days.includes("Sunday") ||
            task.task_days.includes("Domingo")
        )
        .sort((a, b) => {
          // Capturing task_time
          const [hoursA, minutesA] = a.task_hour.split(":").map(Number);
          const [hoursB, minutesB] = b.task_hour.split(":").map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          } else {
            return minutesA - minutesB;
          }
        });
      setSunday(sundayTask);
      //
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (e) => {
    const id = e.target.id;
    const endpoint = `task/${id}`;
    setMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    try {
      const response = await deleteData(endpoint);
      console.log(response);
      setMessage(dictionary[language].dashboard_success_delete);

      setTimeout(() => setMessage(""), 1200);
    } catch (err) {
      console.error(err);
      setMessage(dictionary[language].dashboard_error);
      setTimeout(() => {
        setMessage("");
      }, 1200);
    }
  };

  const handleCompleteTask = async (e) => {
    const id = e.target.id;
    const endpoint = `task/${id}`;
    setMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    try {
      const findTask = dataTask.find((task) => task._id === id).task_completed;
      const boolean = findTask === "true" ? "false" : "true";
      const data = { task_completed: boolean };
      const res = await putData(endpoint, data);

      console.log(res);
      setMessage(dictionary[language].dashboard_success);
      setTimeout(() => setMessage(""), 1000);
    } catch (err) {
      console.error(err);
      setMessage(dictionary[language].dashboard_error);
      setTimeout(() => setMessage(""), 1000);
    }
  };
  const selectTools = (e, tool) => {
    //console.log(e.target, tool);
    setTool(tool);
    setEditTask(false);
    setAddTask(false);
  };

  useEffect(() => {
    fetchTask();
  }, [id, monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  useEffect(() => {}, [dataTask]);
  useEffect(() => {}, [selectTask, message]);

  useEffect(() => {}, [monday]);
  useEffect(() => {}, [tuesday]);
  useEffect(() => {}, [wednesday]);
  useEffect(() => {}, [thursday]);
  useEffect(() => {}, [friday]);
  useEffect(() => {}, [saturday]);
  useEffect(() => {}, [sunday]);
  return (
    <>
      <div className={`dashboard ${appcolor}`}>
        <h1>
          {dictionary[language].dashboard_h1}
          {id.username}
        </h1>
        <section
          className={`week-container ${openWeek ? "open-week" : "close"}`}
        >
          {/** Monday / Lunes **/}
          <section
            className={`day-container ${openTaskMonday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskMonday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseMonday}
            >
              {openTaskMonday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_monday}</p>
              <section className="task-num">
                <p className="task-num">{monday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
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

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** Tuesday / Martes **/}
          <section
            className={`day-container ${openTaskTuesday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskTuesday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseTuesday}
            >
              {openTaskTuesday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_tuesday}</p>
              <section className="task-num">
                <p className="task-num">{tuesday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {tuesday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {tuesday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {tuesday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** Wednesday / Miercoles **/}
          <section
            className={`day-container ${openTaskWednesday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskWednesday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseWednesday}
            >
              {openTaskWednesday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_wednesday}</p>
              <section className="task-num">
                <p className="task-num">{wednesday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {wednesday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {wednesday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {wednesday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** Thursday / Jueves **/}
          <section
            className={`day-container ${openTaskThursday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskThursday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseThursday}
            >
              {openTaskThursday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_thursday}</p>
              <section className="task-num">
                <p className="task-num">{thursday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {thursday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {thursday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {thursday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** Friday / Viernes **/}
          <section
            className={`day-container ${openTaskFriday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskFriday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseFriday}
            >
              {openTaskFriday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_friday}</p>
              <section className="task-num">
                <p className="task-num">{friday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {friday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {friday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {friday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** Saturday / Sabado **/}
          <section
            className={`day-container ${openTaskSaturday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskSaturday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseSaturday}
            >
              {openTaskSaturday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_saturday}</p>
              <section className="task-num">
                <p className="task-num">{saturday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {saturday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {saturday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {saturday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** Sunday / Domingo **/}
          <section
            className={`day-container ${openTaskSunday ? "open" : "close"}`}
          >
            <span
              className={`${
                openTaskSunday ? "icon-arrow-open" : "icon-open"
              }  `}
              onClick={handleClickOpenCloseSunday}
            >
              {openTaskSunday ? (
                <i className="bi bi-chevron-compact-up"></i>
              ) : (
                <i className="bi bi-chevron-compact-down"></i>
              )}
            </span>
            <div className="header-week">
              <p>{dictionary[language].dashboard_sunday}</p>
              <section className="task-num">
                <p className="task-num">{sunday.length}</p>
                <small>{dictionary[language].dashboard_task}</small>
              </section>
            </div>
            <div className="task-container">
              <div className="stage-container">
                <span className="icon">
                  <i className="bi bi-brightness-high-fill size-md"></i>
                </span>
                <div className="task-list">
                  {sunday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 5 && numericHour < 12 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {sunday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 12 && numericHour < 17 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
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
                  {sunday.map((task) => {
                    const [hour] = task.task_hour.split(":");
                    const numericHour = parseInt(hour);

                    return numericHour >= 17 && numericHour < 20 ? (
                      <div className="task" key={task._id}>
                        <div>
                          <p
                            className={`${
                              task.task_completed === "true"
                                ? "complete"
                                : "uncomplete"
                            }`}
                          >
                            {task.task_name}
                          </p>
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
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </section>
          {/** End of the days / Fin de los días**/}
        </section>
        {/** section icons (add and open/close week)  */}
        <div className="week-container-icons">
          <i className="bi bi-trash3 big"></i>
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
        </div>
        {/** icon add and open/close day  */}
        <div className="screen">
          {message ? <span className="message">{message}</span> : null}
          <div className="tools">
            {/** Edit task section**/}
            {editTask || addTask ? (
              <div className="form-container">
                <FormEditAndCreateTask task={selectTask} />
                <button
                  onClick={() =>
                    editTask ? setEditTask(!editTask) : setAddTask(!addTask)
                  }
                  className="close-editCreate"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            ) : tool === "notes" ? (
              <Notes dictionary={dictionary} language={language} />
            ) : tool === "timer" ? (
              <Timer />
            ) : null}

            {/** btn close edit section **/}
            {/** Notes section**/}
          </div>
          {/** Lateral Menu */}
          <div className="nav-tools">
            <div className={`circle ${tool === "notes" ? "active" : null}`}>
              <i
                className="bi bi-file-earmark-text"
                onClick={(e) => selectTools(e, "notes")}
              ></i>
            </div>
            <div className={`circle ${tool === "timer" ? "active" : null}`}>
              <i
                className="bi bi-hourglass-top"
                onClick={(e) => selectTools(e, "timer")}
              ></i>
            </div>
            <Bot />
          </div>
          {/** Lateral Menu */}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
