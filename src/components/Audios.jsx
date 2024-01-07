import { useContext, useEffect, useRef, useState } from "react";
import { Auth } from "../App";
import { addAudio } from "../services";
import "./Audios.css";

function WebCamRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const streamRef = useRef(null);
  const [downloadLink, setDownloadLink] = useState("");
  const streamRecorderRef = useRef(null);
  const [audioSource, setAudioSource] = useState("");
  const [audioSourceOptions, setAudioSourceOptions] = useState([]);
  const [error, setError] = useState(null);
  const chunks = useRef([]);

  //
  const [audioData, setAudioData] = useState([]);
  const { id } = useContext(Auth);

  const audioElementRef = useRef(null);

  const addAudioSubmit = async (audio) => {
    const endpoint = `user/${id._id}/audio`;

    console.log("desde la funcion post", audio);
    try {
      const response = await addAudio(endpoint, audio);
      console.log(response);
      setAudioData([...audioData, response]);
    } catch (err) {
      console.error(err);
    }
  };

  function startRecording() {
    if (isRecording) {
      return;
    }
    if (!streamRef.current) {
      return;
    }
    chunks.current = [];
    streamRecorderRef.current = new MediaRecorder(streamRef.current);
    streamRecorderRef.current.ondataavailable = function (event) {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };
    streamRecorderRef.current.onstop = async function () {
      const blob = new Blob(chunks.current, { type: "audio/wav; codecs=opus" });
      setDownloadLink(URL.createObjectURL(blob));

       // Llamar a la función para enviar el audio a Firebase Storage
      await addAudioSubmit(blob);

      // Limpiar chunks y la URL de descarga
      //chunks.current = [];
      //setDownloadLink("");
    };
    streamRecorderRef.current.start();
    setIsRecording(true);
  }

  function stopRecording() {
    if (!streamRecorderRef.current) {
      return;
    }
    streamRecorderRef.current.stop();
    setIsRecording(false);
  }

  function playRecording() {
    if (downloadLink && audioElementRef.current) {
      audioElementRef.current.src = downloadLink;
      audioElementRef.current.play();
    }
  }

  useEffect(
    function () {
      async function prepareStream() {
        function gotStream(stream) {
          streamRef.current = stream;
        }

        async function getStream() {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
              track.stop();
            });
          }
          const constraints = {
            audio: {
              deviceId: audioSource !== "" ? { exact: audioSource } : undefined,
            },
          };
          try {
            const stream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            gotStream(stream);
          } catch (error) {
            setError(error);
          }
        }

        function getDevices() {
          return navigator.mediaDevices.enumerateDevices();
        }

        function gotDevices(deviceInfos) {
          const audioSourceOptions = [];
          for (const deviceInfo of deviceInfos) {
            if (deviceInfo.kind === "audioinput") {
              audioSourceOptions.push({
                value: deviceInfo.deviceId,
                label: deviceInfo.label || `Microphone ${deviceInfo.deviceId}`,
              });
            }
          }
          setAudioSourceOptions(audioSourceOptions);
        }

        await getStream();
        const mediaDevices = await getDevices();
        gotDevices(mediaDevices);
      }
      prepareStream();
    },
    [audioSource]
  );

  return (
    <div className="audios">
      <div className="miemtras">
        <select
          id="audioSource"
          name="audioSource"
          value={audioSource}
          onChange={(e) => setAudioSource(e.target.value)}
        >
          {audioSourceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        {downloadLink && (
          <div>
            <audio ref={audioElementRef}></audio>
            <button onClick={playRecording}>Reproducir</button>
          </div>
        )}
        {downloadLink && (
          <a href={downloadLink} download="file.wav">
            Descargar
          </a>
        )}
      </div>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Grabar
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Parar
        </button>
      </div>
      <div>{error && <p>{error.message}</p>}</div>
    </div>
  );
}

export default WebCamRecorder;

/*import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Auth } from "../App";
import { addAudio, getUserData } from "../services";
import "./Audios.css";

function Audios() {
  const { id } = useContext(Auth);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [spinner, setSpinner] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [mp3, setMp3] = useState(null);

  const fetchAudios = async () => {
    const endpoint = `user/${id._id}/audios`;
    console.log(endpoint);
    try {
      const response = await getUserData(endpoint);
      console.log(response);
      setAudioData(response);
    } catch (err) {
      console.error(err);
    }
  };

  const addAudioSubmit = async (audio) => {
    const endpoint = `user/${id._id}/audio`;

    console.log("desde la funcion post", audio);
    try {
      const response = await addAudio(endpoint, audio);
      console.log(response);
      setAudioData([...audioData, response]);
    } catch (err) {
      console.error(err);
    }
  };

  const startRecording = async () => {
    setSpinner(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      //  Maneja lo que sucede después de detener la grabación
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/webm" });
        // Enviar estos datos al servidor

        //addAudioSubmit(audioBlob);
        console.log(audioBlob);
        setMp3(audioBlob);
      };

      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error al obtener permisos del micrófono:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    setSpinner(false);
    // Stop recording
  };
  useEffect(() => {
    fetchAudios();
  }, [id, mp3]);
  return (
    <>
      <div className="audios">
        <h1>Audios</h1>
        <div className="audios-container">
          {audioData.map((audio) => (
            <div className="audio" key={audio._id}>
              <audio src={audio.audio_url} id={audio._id} controls></audio>
              <span className="hidde" id={audio._id}>
                <i className="bi bi-trash3"></i>
              </span>
              <span className="emoji">:)</span>
            </div>
          ))}
        </div>
        <span className="spinner">
          {spinner && (
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          )}
        </span>
        <div className="micro-container">
          <span className="micro">
            {spinner ? (
              <i className="bi bi-mic-mute-fill" onClick={stopRecording}></i>
            ) : (
              <i className="bi bi-mic-fill" onClick={startRecording}></i>
            )}
          </span>
          <audio src={mp3}></audio>
        </div>
      </div>
    </>
  );
}
export default Audios;
*/
