import { useEffect } from "react";
import { useState } from "react";
import "./Timer.css";

import useSound from "use-sound";
import alarmAudio from "../assets/alarm-beep.mp3";
import { useRef } from "react";

function Timer() {
  const [hour, setHour] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [hours, setHours] = useState(""); // Input
  const [minutes, setMinutes] = useState(""); // Input
  const [seconds, setSeconds] = useState(""); // Input
  const [paused, setPaused] = useState(false);
  const [reactiveInterval, setReactiveInterval] = useState(null);
  let interval;
  const [alarm, setAlarm] = useState(true);
  const [play, { stop }] = useSound(alarmAudio);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  const handleInputChange = (inputRef, nextInputRef, maxLength) => (event) => {
    if (event.target.value.length === maxLength) {
      nextInputRef.current.focus();
    }
  };
  const handleKeyPress = (e) => {
    const isNumber = /^[0-9]$/;
    if (!isNumber.test(e.key)) {
      e.preventDefault();
    }
  };

  const timer = () => {
    let now = new Date().getTime();
    /*let inputTime = Number(minutes * 1000 * 60) + Number(seconds * 1000);*/
    let totalTime =
      Number(hours || 0) * 3600000 +
      Number(minutes || 0) * 60000 +
      Number(seconds || 0) * 1000;
    let timeLimit = totalTime + now;
    setAlarm(false);

    interval = setInterval(() => {
      let remainingTime = timeLimit - new Date().getTime();
      let hour = Math.floor(remainingTime / 3600000);
      let min = Math.floor((remainingTime % 3600000) / 60000);
      let sec = Math.floor((remainingTime % 60000) / 1000);
      /*let tempo = timeLimit - new Date().getTime();
      let hour = Math.floor(tempo / 3600000);
      let min = Math.floor(tempo / 60000);
      let sec = Math.floor(tempo / 1000) - 60 * min;*/

      // Reset inputs
      setMinutes("");
      setSeconds("");
      setHours("");
      // Reset inputs

      if (min < 10) min = "0" + min;

      if (sec < 10) sec = "0" + sec;

      if (hour < 10) hour = "0" + hour;

      setMin(min);
      setSec(sec);
      setHour(hour);

      //console.log(min, sec);

      if (remainingTime <= 0) {
        play();
        setMin("00");
        setSec("00");
        setHour("00");
        clearInterval(interval);
        setPaused(true);
        setAlarm(true);
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
    setHour("00");
  };

  useEffect(() => {}, [minutes, seconds, hours, paused, reactiveInterval]);
  useEffect(() => {
    input1Ref.current.focus();
  }, [input1Ref]);
  //

  return (
    <>
      <div className="timer-body">
        <div className="input-container">
          <input
            type="tel"
            name="hours"
            id="hours"
            value={hours}
            ref={input3Ref}
            pattern="\d{2}"
            maxLength="2"
            disabled={!alarm}
            onInput={handleInputChange(input3Ref, null, 2)}
            onKeyPress={handleKeyPress}
            onChange={(e) => setHours(e.target.value)}
          />
          <input
            type="tel"
            name="minutes"
            id="minutes"
            value={minutes}
            pattern="\d{2}"
            maxLength="2"
            ref={input2Ref}
            disabled={!alarm}
            onInput={handleInputChange(input2Ref, input3Ref, 2)}
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
            ref={input1Ref}
            onKeyPress={handleKeyPress}
            onInput={handleInputChange(input1Ref, input2Ref, 2)}
            onChange={(e) => setSeconds(e.target.value)}
          />
          {/***/}
        </div>
        <div className="timer-container">
          <div className="timer">
            <span>
              {hour} : {min} : {sec}
            </span>
          </div>
          <div className="controls">
            {seconds || minutes || hours ? (
              <i className="bi bi-play-fill" onClick={timer}></i>
            ) : null}
            {paused && (
              <i className="bi bi-pause-fill" onClick={pauseTimer}></i>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Timer;
