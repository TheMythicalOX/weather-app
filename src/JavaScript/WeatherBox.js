import { useCallback, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import DisplayInfo from "./DisplayInfo";

const WeatherBox = (props) => {
  // Set useStates / variables
  const [searchLength, setSearchLength] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [temp, setTemp] = useState("Temp");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
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
  const changeIconInfo = useCallback(
    (i) => {
      setSign(i);
      if (i === "F") {
        setTemp(Math.round(data.temp));
        setWind(Math.round(data.wind));
        setTempMin(Math.round(data.tempMin));
        setTempMax(Math.round(data.tempMax));
        setFeelsLike(Math.round(data.feelsLike));
      }
      if (i === "C") {
        setTemp(Math.round(((data.temp - 32) * 5) / 9));
        setWind(Math.round(data.wind * 1.609));
        setTempMin(Math.round(((data.tempMin - 32) * 5) / 9));
        setTempMax(Math.round(((data.tempMax - 32) * 5) / 9));
        setFeelsLike(Math.round(((data.feelsLike - 32) * 5) / 9));
      }
    },
    [data.temp, data.wind, data.tempMin, data.tempMax, data.feelsLike]
  );

  // get and change units used for displaying information
  const handleUnits = (i) => {
    changeIconInfo(i);
  };

  // Get weather data and save the data, or throw error if invalid
  const getWeatherData = (dropName) => {
    let tmpSearch = "";
    if (dropName !== null) tmpSearch = dropName;
    else tmpSearch = dropName;
    setIsPending(true);
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(
        `${api.base}weather?q=${tmpSearch}&units=imperial&APPID=${api.key}`,
        {
          signal: abortCont.signal,
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Please Enter Valid Location");
          }
          return res.json();
        })
        .then((result) => {
          setData({
            clouds: result.clouds.all,
            wind: result.wind.speed,
            windDeg: result.wind.deg,
            temp: result.main.temp,
            tempMin: result.main.temp_min,
            tempMax: result.main.temp_max,
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            feelsLike: result.main.feels_like,
            icon: result.weather[0].icon,
            desc: result.weather[0].main,
          });
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          }
          setIsPending(false);
          setError(err.message);
        });
    });
  };

  // Prevent button default and get the weather data
  const handleSubmit = (dropName) => {
    getWeatherData(dropName);
  };

  // page refresh
  useEffect(() => {
    if (data.temp) {
      changeIconInfo(sign);
    }
  }, [data, changeIconInfo, sign]);

  // Components html
  return (
    <div className="vert-align">
      <div className="weather-box">
        {temp === "Temp" && <div className="padder"></div>}
        {/* Display information */}
        {temp !== "Temp" && (
          <DisplayInfo
            data={data}
            sign={sign}
            temp={temp}
            wind={wind}
            tempMin={tempMin}
            tempMax={tempMax}
            feelsLike={feelsLike}
            handleUnits={handleUnits}
          />
        )}

        {/* Gets search location */}
        <form>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(search);
            }}
          >
            Search...
          </button>
          <input
            type="text"
            placeholder="Enter Location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLength(e.target.value.length);
            }}
          />
          {/* drop down menu for search */}
          {searchLength > 2 && search && (
            <Dropdown
              handleSubmit={handleSubmit}
              setSearchLength={setSearchLength}
              setSearch={setSearch}
              search={search}
            />
          )}
        </form>
        {error && <h1>{error}</h1>}
        {isPending && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default WeatherBox;
