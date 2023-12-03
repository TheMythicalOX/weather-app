import { useCallback, useEffect, useState } from "react";

const WeatherBox = (props) => {
  const [temp, setTemp] = useState("Temp");
  const [wind, setWind] = useState("Wind");
  const [search, setSearch] = useState("");
  const [sign, setSign] = useState("F");
  const [data, setData] = useState({});

  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const changeInfo = useCallback(
    (i) => {
      setSign(i);
      if (i === "F") {
        setTemp(Math.round(data.temp));
        setWind(Math.round(data.wind));
      }
      if (i === "C") {
        setTemp(Math.round(((data.temp - 32) * 5) / 9));
        setWind(Math.round(data.wind * 1.609));
      }
      if (i === "K") {
        setTemp(Math.round(((data.temp - 32) * 5) / 9 + 273.15));
        setWind(Math.round(data.wind * 1.609));
      }
    },
    [data.temp, data.wind]
  );

  const handleUnits = (e) => {
    changeInfo(e.target.value);
  };

  const getWeatherData = () => {
    fetch(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ wind: result.wind.speed, temp: result.main.temp });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  useEffect(() => {
    if (data.temp) {
      changeInfo(sign);
    }
  }, [data, changeInfo, sign]);

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
