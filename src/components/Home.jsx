import {
  useContext,
  useState,
  //useEffect, useState
} from "react";
import {
  //Auth,
  Color,
  Language,
} from "../App";
import "./Home.css";
import Login from "./Login";
import Girl from "../assets/cro-girl.mp4";
import Note from "../assets/cro-note-clock.mp4";
import Clock from "../assets/reloj-con-filtro-removebg-preview.png";
import Clock2 from "../assets/clock-new-removebg-preview.png";
import Cat from "../assets/Cat.mp4";

function Home() {
  const { appcolor } = useContext(Color);
  const { dictionary, language } = useContext(Language);
  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseMove = (e) => {
    const containerWidth = e.target.offsetWidth;
    const mouseX = e.nativeEvent.offsetX;
    console.log(e.target.offsetX);
    if (mouseX < containerWidth / 2 - 20) {
      setMouseOver(true);
    } else if (mouseX > containerWidth / 2 + 20) {
      setMouseOver(false);
    }
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };
  return (
    <>
      <div className={`home ${appcolor}`}>
        <section className="featured">
          <div className="section left">
            <p>{dictionary[language].home_clock_left}</p>
          </div>
          <div className="section right">
            <p>{dictionary[language].home_clock_right}</p>
          </div>

          <div
            className="absolute"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {mouseOver && <img src={Clock} className="slide" />}
            {!mouseOver && <img src={Clock2} className="slide-2" />}
          </div>
          <div className="h1">
            <h1>{dictionary[language].home_h1}</h1>
          </div>
        </section>
        <div className="animation-container">
          <div className="video1">
            <video src={Cat} autoPlay loop className="video"></video>
            <p>{dictionary[language].home_video_1}</p>
          </div>
          <div className="video2">
            <video src={Girl} autoPlay loop className="video"></video>
            <p>{dictionary[language].home_video_2}</p>
          </div>
          <div className="video3">
            <video src={Note} autoPlay loop className="video"></video>
            <p>{dictionary[language].home_video_3}</p>
          </div>
        </div>
        <h3>{ dictionary[language].home_h3}</h3>
        <Login />
      </div>
    </>
  );
}
export default Home;
