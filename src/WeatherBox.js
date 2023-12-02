import { useState } from "react";

const WeatherBox = () => {
  const [temp, setTemp] = useState("Temp");
  const [wind, setWind] = useState("Wind");
  const [units, setUnits] = useState("metric");
  const [name, setName] = useState("");

  const api = {
    key: "c37881d80ee2eb0518418590500f0104",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${api.base}weather?q=${name}&units=${units}&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="weather-box">
      <h1>{temp}</h1>
      <h2>{wind}</h2>
      <form>
        <label>Name</label>
        <textarea onChange={(e) => setName(e.target.value)}>{name}</textarea>
        <button onClick={handleSubmit}>Search...</button>
      </form>
    </div>
  );
};

export default WeatherBox;
