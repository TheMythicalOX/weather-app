import { useState } from "react";

const WeatherBox = () => {
  const [temp, setTemp] = useState("Temp");
  const [wind, setWind] = useState("Wind");
  const [units, setUnits] = useState("imperial");
  const [name, setName] = useState("");
  const [sign, setSign] = useState("F");

  const apiKey = JSON.stringify(process.env.REACT_APP_API_KEY);

  const api = {
    key: apiKey,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const getWeatherData = (unit) => {
    fetch(`${api.base}weather?q=${name}&units=${unit}&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTemp(result.main.temp);
        setWind(result.wind.speed);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(units);
    handleSign(units);
  };

  const handleUnits = (e) => {
    // console.log(e.target.value);
    getWeatherData(e.target.value);
    setUnits(e.target.value);
    handleSign(e.target.value);
  };

  const handleSign = (sign) => {
    if (sign === "imperial") setSign("F");
    if (sign === "metric") setSign("C");
    if (sign === "kelvin") setSign("K");
  };

  return (
    <div className="weather-box">
      <h1>
        Temp: {temp}°{sign}
      </h1>
      {sign !== "F" && <h2>Wind: {wind} Km/h</h2>}
      {sign === "F" && <h2>Wind: {wind} mph</h2>}
      <form>
        <label>Name</label>
        <textarea onChange={(e) => setName(e.target.value)}>{name}</textarea>
        <button onClick={handleSubmit}>Search...</button>
      </form>
      {temp !== "Temp" && (
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
