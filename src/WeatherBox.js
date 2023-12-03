import { useCallback, useEffect, useState } from "react";

const WeatherBox = (props) => {
  // Set useStates
  const [temp, setTemp] = useState("Temp");
  const [wind, setWind] = useState("Wind");
  const [search, setSearch] = useState("");
  const [sign, setSign] = useState("F");
  const [data, setData] = useState({});

  // Set api key and base link
  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  // Set information that is changed by setting units
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

  // get and change units used for displaying information
  const handleUnits = (e) => {
    changeInfo(e.target.value);
  };

  // Get weather data and save the data
  const getWeatherData = () => {
    fetch(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ wind: result.wind.speed, temp: result.main.temp });
      });
  };

  // Prevent button default and get the weather data
  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  // page refresh
  useEffect(() => {
    if (data.temp) {
      changeInfo(sign);
    }
  }, [data, changeInfo, sign]);

  // Components html
  return (
    <div className="weather-box">
      <div className="padder"></div>

      {/* Display information */}
      {temp !== "Temp" && (
        <h1>
          Temp: {temp}°{sign}
        </h1>
      )}
      {temp !== "Temp" && sign !== "F" && <h2>Wind: {wind} Km/h</h2>}
      {temp !== "Temp" && sign === "F" && <h2>Wind: {wind} mph</h2>}

      {/* Gets search location */}
      <form>
        <input
          type="text"
          placeholder="Enter Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSubmit}>Search...</button>
      </form>

      {/* Units selector, only visible when temp is set */}
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
