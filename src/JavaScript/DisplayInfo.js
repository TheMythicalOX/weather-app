import ChangeUnits from "./ChangeUnits";

const DisplayInfo = (props) => {
  const data = props.data;
  const temp = props.temp;
  const sign = props.sign;
  const tempMax = props.tempMax;
  const tempMin = props.tempMin;
  const feelsLike = props.feelsLike;
  const wind = props.wind;
  const handleUnits = props.handleUnits;
  return (
    <div className="display-info">
      <img
        className="icon"
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.icon}
      />
      <h1 className="temp">
        {temp}°{sign}
      </h1>
      <h1 className="feels-like">
        Feels Like: {feelsLike}°{sign}
      </h1>
      <h1 className="high-low">
        {tempMax}°/{tempMin}°
      </h1>
      <h2 className="pressure">Pressure: {data.pressure}</h2>
      <h2 className="humidity">Humidity: {data.humidity}</h2>
      <h2 className="desc">Desc: {data.desc}</h2>
      <h2 className="clouds">clouds: {data.clouds}</h2>
      {sign !== "F" && <h2 className="wind">Wind: {wind} Km/h</h2>}
      {sign === "F" && <h2 className="wind">Wind: {wind} mph</h2>}
      <h2 className="wind-dr">Wind Direction: {data.windDeg}</h2>
      {temp !== "Temp" && <ChangeUnits sign={sign} handleUnits={handleUnits} />}
    </div>
  );
};

export default DisplayInfo;
