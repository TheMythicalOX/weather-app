import { useState } from "react";

const WeatherBox = () => {
  const [temp, setTemp] = useState("Temp");
  const [wind, setWind] = useState("Wind");
  const base = { temp: "", wind: "" };
  const [search, setSearch] = useState("");
  const [sign, setSign] = useState("F");

  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const changeInfo = (i) => {
    setSign(i);
    // console.log(i, temp, wind);
    if (i === "F") {
      setTemp(Math.round(base.temp));
      setWind(Math.round(base.wind));
    }
    if (i === "C") {
      setTemp(Math.round(((base.temp - 32) * 5) / 9));
      setWind(Math.round(base.wind * 1.609));
    }
    if (i === "K") {
      setTemp(Math.round(((base.temp - 32) * 5) / 9 + 273.15));
      setWind(Math.round(base.wind * 1.609));
    }
  };

  const handleUnits = (e) => {
    // console.log(e.target.value);
    changeInfo(e.target.value);
  };

  const getWeatherData = () => {
    fetch(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setTemp(result.main.temp);
        setWind(result.wind.speed);
        console.log(temp, wind);
        changeInfo(sign);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  return (
    <div className="weather-box">
      <div className="padder"></div>
      {temp !== "Temp" && (
        <h1>
          Temp: {temp}°{sign}
        </h1>
      )}
      {temp !== "Temp" && sign !== "F" && <h2>Wind: {wind} Km/h</h2>}
      {temp !== "Temp" && sign === "F" && <h2>Wind: {wind} mph</h2>}
      <form>
        <input
          type="text"
          placeholder="Enter Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSubmit}>Search...</button>
      </form>
      {temp !== "Temp" && (
        <select onChange={handleUnits}>
          <option value="F">imperial</option>
          <option value="C">metric</option>
          <option value="K">kelvin</option>
        </select>
      )}
    </div>
  );
};

export default WeatherBox;
