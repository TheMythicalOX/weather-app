import { useState } from "react";

const WeatherBox = () => {
  const [temp, setTemp] = useState("Temp");
  const [wind, setWind] = useState("Wind");
  const [baseTemp, setBaseTemp] = useState(0);
  const [baseWind, setBaseWind] = useState(0);
  const [name, setName] = useState("");
  const [sign, setSign] = useState("F");

  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const getWeatherData = () => {
    fetch(`${api.base}weather?q=${name}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setWind(Math.round(result.wind.speed));
        setTemp(Math.round(result.main.temp));
        setBaseTemp(result.main.temp);
        setBaseWind(result.wind.speed);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  const handleUnits = (e) => {
    // console.log(e.target.value);
    if (e.target.value === "imperial") {
      setSign("F");
      setTemp(Math.round(baseTemp));
      setWind(Math.round(baseWind));
    }
    if (e.target.value === "metric") {
      setSign("C");
      setTemp(Math.round(((baseTemp - 32) * 5) / 9));
      setWind(Math.round(baseWind * 1.609));
    }
    if (e.target.value === "kelvin") {
      setSign("K");
      setTemp(Math.round(((baseTemp - 32) * 5) / 9 + 273.15));
      setWind(Math.round(baseWind * 1.609));
    }
  };

  return (
    <div className="weather-box">
      {temp !== "Temp" && (
        <h1>
          Temp: {temp}°{sign}
        </h1>
      )}
      {temp !== "Temp" && sign !== "F" && <h2>Wind: {wind} Km/h</h2>}
      {temp !== "Temp" && sign === "F" && <h2>Wind: {wind} mph</h2>}
      <form>
        <label>Name</label>
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Search...</button>
      </form>
      {baseTemp !== 0 && (
        <select onChange={handleUnits}>
          <option value="imperial">imperial</option>
          <option value="metric">metric</option>
          <option value="kelvin">kelvin</option>
        </select>
      )}
    </div>
  );
};

export default WeatherBox;
