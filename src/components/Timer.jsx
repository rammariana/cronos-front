import { useEffect } from "react";
import { useState } from "react";
import "./Timer.css";

import useSound from "use-sound";
import alarmAudio from "../assets/alarm-beep.mp3";

function Timer() {
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [minutes, setMinutes] = useState(""); // Input
  const [seconds, setSeconds] = useState(""); // Input
  const [paused, setPaused] = useState(false);
  const [reactiveInterval, setReactiveInterval] = useState(null);
  let interval;
  const [alarm, setAlarm] = useState(true);
  const [play, { stop }] = useSound(alarmAudio);

  const handleKeyPress = (e) => {
    const isNumber = /^[0-9]$/;
    if (!isNumber.test(e.key)) {
      e.preventDefault();
    }
  };

  const timer = () => {
    let now = new Date().getTime();
    let inputTime = Number(minutes * 1000 * 60) + Number(seconds * 1000);
    let timeLimit = inputTime + now;
    setAlarm(false);

    interval = setInterval(() => {
      let tempo = timeLimit - new Date().getTime();
      let min = Math.floor(tempo / 60000);
      let sec = Math.floor(tempo / 1000) - 60 * min;

      // Reset inputs
      setMinutes("");
      setSeconds("");
      // Reset inputs

      if (min < 10) {
        min = "0" + min;
      }

      if (sec < 10) {
        sec = "0" + sec;
      }

      setMin(min);
      setSec(sec);

      console.log(tempo, min, sec);
      if (min === "00" && sec === "00") {
        setPaused(true);
        setAlarm(true);
        clearInterval(interval);
        play();
      }
    }, 400);
    setTimeout(() => {
      setPaused(true);
    }, 400);

    setReactiveInterval(interval);
  };

  const pauseTimer = () => {
    setPaused(false);
    setAlarm(true);
    clearInterval(reactiveInterval);
    stop();
    setMin("00");
    setSec("00");
  };

  useEffect(() => {}, [minutes, seconds, paused, reactiveInterval]);
  //

  return (
    <>
      <div className="timer-body">
        <h1>Timer</h1>
        <div className="input-container">
          <input
            type="tel"
            name="minutes"
            id="minutes"
            value={minutes}
            pattern="\d{2}"
            maxLength="2"
            disabled={!alarm}
            onKeyPress={handleKeyPress}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <input
            type="tel"
            name="seconds"
            id="seconds"
            value={seconds}
            pattern="\d{2}"
            disabled={!alarm}
            maxLength="2"
            onKeyPress={handleKeyPress}
            onChange={(e) => setSeconds(e.target.value)}
          />
          {/***/}
        </div>
        <div className="timer-container">
          <div className="timer">
            <span>
              {min} : {sec}
            </span>
          </div>
          {seconds && <i className="bi bi-play-fill" onClick={timer}></i>}
          {paused && <i className="bi bi-pause-fill" onClick={pauseTimer}></i>}
        </div>
      </div>
    </>
  );
}
export default Timer;
