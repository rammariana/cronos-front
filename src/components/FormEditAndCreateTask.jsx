import { useContext, useEffect, useState } from "react";
import { Auth, Color, Language } from "../App";
import { addData, putData } from "../services";
import "./FormEditAndCreateTask.css";

function FormEditAndCreateTask({task}) {
  const [dataTask, setDataTask] = useState([]);
  const [formMessage, setFormMessage] = useState('');
  const { dictionary, language } = useContext(Language);
  const { id } = useContext(Auth);
  const { appcolor } = useContext(Color);
  const [formTask, setFormTask] = useState({
    task_name: task && task.task_name ? task.task_name : "",
    task_days: task && task.task_days ? task.task_days : dictionary[language].dashboard_monday,
    task_hour: task && task.task_hour ? task.task_hour : "",
    task_priority: task && task.task_priority ? task.task_priority : dictionary[language].form_input_placeholder_priority,
  });

  const taskChange = (e) => {
    setFormTask({
      ...formTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrEditTask = async (e) => {
    e.preventDefault();
    console.log(task);
    setFormMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

    if (task && task._id) {
      const endpoint = `task/${task._id}`;
      try {
        const data = formTask;
        const response = await putData(endpoint, data);
        console.log(response);
        setDataTask([...dataTask, response]);

        // clean inputs

        setFormTask({
          task_name: "",
          task_days: "",
          task_hour: "",
          task_priority: "",
        });

        setFormMessage(dictionary[language].dashboard_success);
        setTimeout(() => setFormMessage(""), 1500);
      } catch (err) {
        console.log(err);
        setFormMessage(dictionary[language].dashboard_error);
        setTimeout(() => setFormMessage(""), 1500);
      }
    } else {
      const endpoint = `user/${id._id}`;
      setFormMessage(
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
      try {
        const data = formTask;
        const response = await addData(endpoint, data);
        console.log(response);
        setDataTask([...dataTask, response]);

        // clean inputs

        setFormTask({
          task_name: "",
          task_days: "",
          task_hour: "",
          task_priority: "",
        });

        setFormMessage(dictionary[language].dashboard_success);
        setTimeout(() => setFormMessage(""), 1500);
      } catch (err) {
        console.log(err);
        setFormMessage(dictionary[language].dashboard_error);
        setTimeout(() => setFormMessage(""), 1500);
      }
    }
  };

  useEffect(() => {
    //console.log(dataTask);
  }, [dataTask]);

  useEffect(() => {
    //console.log(task);
    //console.log(formTask);
  }, [formTask, task]);

  return (
    <>
      <form onSubmit={handleCreateOrEditTask} className={`form ${appcolor}`}>
        <span className="message-form">{formMessage}</span>
        <input
          type="text"
          maxLength={25}
          name="task_name"
          id="task"
          value={formTask.task_name}
          placeholder={dictionary[language].form_input_placeholder_taskName}
          onChange={taskChange}
        />
        <select
          name="task_days"
          id="task_days"
          value={formTask.task_days}
          onChange={taskChange}
        >
          <option value="monday">
            {dictionary[language].dashboard_monday}
          </option>
          <option value="tuesday">
            {dictionary[language].dashboard_tuesday}
          </option>
          <option value="wednesday">
            {dictionary[language].dashboard_wednesday}
          </option>
          <option value="thursday">
            {dictionary[language].dashboard_thursday}
          </option>
          <option value="friday">
            {dictionary[language].dashboard_friday}
          </option>
          <option value="saturday">
            {dictionary[language].dashboard_saturday}
          </option>
          <option value="sunday">
            {dictionary[language].dashboard_sunday}
          </option>
        </select>
        <input
          type="time"
          name="task_hour"
          id="task_hour"
          value={formTask.task_hour}
          onChange={taskChange}
        />
        <select
          name="task_priority"
          id="task_priority"
          value={formTask.task_priority}
          onChange={taskChange}
        >
          <option value="hight">
            {dictionary[language].form_input_option_hight}
          </option>
          <option value="medium">
            {dictionary[language].form_input_option_medium}
          </option>
          <option value="low">
            {dictionary[language].form_input_option_low}
          </option>
        </select>
        <button type="submit">
          {task && task._id
            ? dictionary[language].form_btn_update
            : dictionary[language].form_btn_create}
        </button>
      </form>
    </>
  );
}
export default FormEditAndCreateTask