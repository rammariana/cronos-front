import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { addData, getUserData } from "./services";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

// Context
export const Color = createContext();
export const Auth = createContext();
export const Language = createContext();

function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");
  const [user, setUser] = useState([]); // User data
  const [userId, setUserId] = useState(""); // Used for redirect url
  const [userFound, setUserFound] = useState(null); // Used to verify that the user exists and navigate
  const [message, setMessage] = useState(null); // Message success & fail
  const [selectLanguage, setSelectLanguage] = useState("🇪🇦");
  const [btnDisable, setBtnDisable] = useState("available");

  const languageDictionary = {
    "🇪🇦": {
      home_h1: "Gestiona tu tiempo con Cronos",
      home_btn_login: "Iniciar sesión",
      home_btn_register: "Registrame",
      home_input_placeholder_email: "Correo",
      home_input_placeholder_pass: "Contraseña",
      home_input_placeholder_name: "Nombre",
      home_span_registred: "Ya tengo una cuenta",
      home_span_noregistred: "Aún no tengo una cuenta",
      //
      auth_error_msg: "Error, intenta más tarde",
      auth_incorrect_data: "Datos incorrectos",
      auth_searching_data: "Buscando...",
      //
      dashboard_empty_fields: "Campos vacíos",
      dashboard_empty_title: "Campo título vacío",
      dashboard_empty_description: "Campo descripción vacío",
      dashboard_success: "¡Listo!",
      dashboard_success_delete: "¡Removido con éxito!",
      dashboard_error: "Aish, hubo un error... Intenta más tarde",
      dashboard_monday: "Lunes",
      dashboard_tuesday: "Martes",
      dashboard_wednesday: "Miércoles",
      dashboard_thursday: "Jueves",
      dashboard_friday: "Viernes",
      dashboard_saturday: "Sábado",
      dashboard_sunday: "Domingo",
      dashboard_taks: "tareas",
      dashboard_h1: "Binevenid@",
      dashboard_input_placeholder_title: "Título",
      dashboard_input_placeholder_description: "Descripción",
      dashboard_btn_add_note: "Añadir nota",
      dashboard_btn_close: "Close",
      dashboard_btn_send: "Send",

      //
      form_btn_close_edit_create: "Cerrar",
      form_input_placeholder_days: "Día",
      form_input_placeholder_priority: "Prioridad",
      form_input_placeholder_taskName: "Nombre de la tarea",
      form_input_placeholder_hour: "Hora",
      form_input_label_priority: "Prioridad",
      form_input_option_hight: "Alta",
      form_input_option_medium: "Media",
      form_input_option_low: "Baja",
      form_btn_update: "Actualizar",
      form_btn_create: "Crear",
    },
    "🇬🇧": {
      home_h1: "Manage your time with Cronos",
      home_btn_login: "Login",
      home_btn_register: "Register",
      home_input_placeholder_email: "Email",
      home_input_placeholder_pass: "Password",
      home_input_placeholder_name: "Name",
      home_span_registred: "I've already got an account",
      home_span_noregistred: "I don't have an account yet",
      //
      auth_error_msg: "Error, try again later",
      auth_incorrect_data: "Incorrect data",
      auth_searching_data: "Searching...",
      //
      dashboard_empty_fields: "Empty fields",
      dashboard_empty_title: "Empty title field",
      dashboard_empty_description: "Empty description field",
      dashboard_success: "All set!",
      dashboard_success_delete: "Successfully removed!",
      dashboard_error: "Oops, there was a mistake... Try again later!",
      dashboard_monday: "Monday",
      dashboard_tuesday: "Tuesday",
      dashboard_wednesday: "Wednesday",
      dashboard_thursday: "Thursday",
      dashboard_friday: "Friday",
      dashboard_saturday: "Saturday",
      dashboard_sunday: "Sunday",
      dashboard_taks: "tasks",
      dashboard_h1: "Welcome",
      dashboard_input_placeholder_title: "Title",
      dashboard_input_placeholder_description: "Description",
      dashboard_btn_add_note: "Añadir nota",
      dashboard_btn_close: "Cerrar",
      dashboard_btn_send: "Enviar",
      //
      form_input_placeholder_days: "Day",
      form_btn_close_edit_create: "Close",
      form_input_placeholder_priority: "Priority",
      form_input_placeholder_taskName: "Task name",
      form_input_placeholder_hour: "Hour",
      form_input_label_priority: "Priority",
      form_input_option_hight: "Hight",
      form_input_option_medium: "Medium",
      form_input_option_low: "Low",
      form_btn_update: "Update",
      form_btn_create: "Create",
    },
  };

  // Context functions 🇪🇸
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const languageMode = () => {
    setSelectLanguage((prevlanguage) => (prevlanguage === "🇪🇦" ? "🇬🇧" : "🇪🇦"));
  };

  const usersAuth = async (email, password) => {
    const endpoint = "users";
    setBtnDisable("disabled");
    setMessage(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    try {
      //setMessage(languageDictionary[selectLanguage].auth_searching_data);
      const response = await getUserData(endpoint);
      const found = response.find((e) => {
        return e.email === email && e.password === password;
      });
      if (found) {
        setUserFound(true);
        setUserId(found._id);
        setUser(found);
      } else {
        setMessage(languageDictionary[selectLanguage].auth_incorrect_data);
        setTimeout(() => {
          setMessage("");
          setBtnDisable("available");
        }, 1500);
        //console.error("Incorrect data");
      }
    } catch (err) {
      console.error(err);
      err
        ? setMessage(languageDictionary[selectLanguage].auth_error_msg)
        : setMessage("");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      setBtnDisable("available");
    }
  };
  const userRegister = async (email, password, username) => {
    const endpoint = "user";
    const data = { email, password, username };

    try {
      if (email && password) {
        const response = await addData(endpoint, data);

        setBtnDisable("disabled");
        setMessage(
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );

        setUser(response);
        setUserId(response._id);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        setMessage(languageDictionary[selectLanguage].dashboard_empty_fields);
        setTimeout(() => {
          setMessage("");
        }, 1500);
        setBtnDisable("available");
      }
    } catch (err) {
      console.log("Error");
      setMessage(`${err.status}, try later`);
      setTimeout(() => {}, 1500);
    }
  };
  useEffect(() => {
    if (userFound || (user && Object.keys(user).length > 0)) {
      setTimeout(() => {
        navigate(`/dashboard/user/${userId}`);
      }, 2000);
    } else {
      navigate("/");
    }
  }, [userId, userFound, navigate, user]);

  return (
    <>
      {/* The components Header, Home, Footer & Dashboard are wrapped by Providers */}
      {/* The Dashboard component contains additional Providers due to authentication */}

      <Color.Provider value={{ appcolor: mode, toggleMode }}>
        <Auth.Provider
          value={{
            id: user,
            usersAuth,
            message: message,
            userRegister,
            disable: btnDisable,
          }}
        >
          <Language.Provider
            value={{
              dictionary: languageDictionary,
              language: selectLanguage,
              languageMode,
            }}
          >
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/dashboard/user/:id"
                element={
                  <Color.Provider value={{ appcolor: mode, toggleMode }}>
                    <Auth.Provider
                      value={{
                        id: user,
                        usersAuth,
                        message: message,
                        userRegister,
                      }}
                    >
                      <Language.Provider
                        value={{
                          dictionary: languageDictionary,
                          language: selectLanguage,
                          languageMode,
                        }}
                      >
                        <Dashboard />
                      </Language.Provider>
                    </Auth.Provider>
                  </Color.Provider>
                }
              />
            </Routes>
            <Footer />
          </Language.Provider>
        </Auth.Provider>
      </Color.Provider>
    </>
  );
}

export default App;
