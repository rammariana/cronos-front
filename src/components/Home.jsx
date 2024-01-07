import {
  useContext,
  //useEffect, useState
} from "react";
import {
  //Auth,
  Color, Language,
} from "../App";
import "./Home.css";
import Login from "./Login";

function Home() {
  const { appcolor } = useContext(Color);
  const {dictionary, language} = useContext(Language)
  return (
    <>
      <div className={`home ${appcolor}`}>
        <h1>{ dictionary[language].home_h1}</h1>
        <Login />
      </div>
    </>
  );
}
export default Home;
