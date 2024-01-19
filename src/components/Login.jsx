import { useContext, useEffect, useState } from "react";
import { Auth, Language } from "../App";
import './Login.css'

function Login() {
  const { message, usersAuth, userRegister, disable } = useContext(Auth);
  const [loginRegister, setLoginRegister] = useState(true);
  const { dictionary, language } = useContext(Language);
  //  const { appcolor } = useContext(Color);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formRegister, setFormRegister] = useState({
    username: "",
  });

  const handleLoginChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterOrLogin = () => {
    setLoginRegister(!loginRegister);
    //console.log(setLoginRegister);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await usersAuth(form.email, form.password);
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    await userRegister(form.email, form.password, formRegister.username);
  };

  useEffect(() => {
    //console.log(message, language);
  }, [message, language]);

  useEffect(() => {}, [form]);
  return (
    <>
      <form
        className="form-register"
        onSubmit={loginRegister ? handleLoginSubmit : handleRegisterSubmit}
      >
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          placeholder={dictionary[language].home_input_placeholder_email}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          id="pasword"
          value={form.password}
          placeholder={dictionary[language].home_input_placeholder_pass}
          onChange={handleLoginChange}
        />
        {!loginRegister && (
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            placeholder={dictionary[language].home_input_placeholder_name}
            onChange={handleRegisterChange}
          />
        )}
        <span className="span-message">{message}</span>
        <button className={`btn-register ${disable}`} type="submit">
          {loginRegister
            ? dictionary[language].home_btn_login
            : dictionary[language].home_btn_register}
        </button>
      </form>
      <span
        onClick={handleRegisterOrLogin}
        className={`span-register-login ${disable}`}
      >
        {loginRegister
          ? dictionary[language].home_span_noregistred
          : dictionary[language].home_span_registred}
      </span>
    </>
  );
}
export default Login;
