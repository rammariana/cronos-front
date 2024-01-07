import "./Hearder.css";
import {useContext, useEffect, useState } from "react";
import { Color, Language } from "../App";
import { Link} from "react-router-dom";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const { toggleMode, appcolor } = useContext(Color);
  const { languageMode, language } = useContext(Language);

  const handleModeClick = () => {
    setDarkMode(!darkMode);
    toggleMode();
  };
  const handleLanguageClick = () => {
    languageMode();
  };
  useEffect(() => {
    console.log(appcolor);
     console.log(language);
  }, [appcolor, darkMode, language])
  return (
    <>
      <header className={`header ${appcolor}`}>
        <Link to="/">LOGO</Link>
        <div className="container_btns">
          {/** Btn dark mode */}
          <div
            className={`button-container ${
              darkMode ? "button-light" : "button-dark"
            }`}
            onClick={handleModeClick}
          >
            <div className={`button-slide ${darkMode ? "start" : "end"}`}></div>
          </div>
          {/** Btn dark mode */}
          <button className="btn-language" onClick={handleLanguageClick}>
            {language}
          </button>
        </div>
      </header>
    </>
  );
}
export default Header;
