import { useContext } from 'react';
import { Link } from "react-router-dom";
import { Color, Language } from "../App";
import "./Footer.css";
import node from "../assets/node-logo.png";
import react from "../assets/react-logo.png";
import mongo from "../assets/mongo.png";

function Footer() {
  const { appcolor } = useContext(Color);
  const { dictionary, language } = useContext(Language);

  return (
    <>
      <footer className={`footer ${appcolor}`}>
        <div className="section-footer contact">
          <p>{dictionary[language].footer_contact}</p>
          <div className="footer-icon">
            <Link
              to="https://github.com/rammariana?tab=repositories"
              target="_blank"
            >
              <i className="bi bi-github"></i>
            </Link>
            <a href="mailto:marianasmatos1@example.com">
              <i className="bi bi-envelope-fill"></i>
            </a>
            <Link
              to="https://www.linkedin.com/in/mariana-ram%C3%ADrez-6b969b287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
            >
              <i className="bi bi-linkedin"></i>
            </Link>
          </div>
        </div>
        <div className="section-footer">
          <p className="small">{dictionary[language].footer_programmed_by}</p>
        </div>
        <div className="section-footer tecno">
          <p>{dictionary[language].footer_tecno}</p>
          <div className="footer-icon favicon">
            <img src={node} />
            <img src={react} className="react-logo" />
            <img src={mongo} />
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
