import { useState } from "react";
import WeatherBox from "./WeatherBox";

function App() {
  // compare button handler
  const [isComp, setIsComp] = useState(false);
  const handleCompare = () => {
    if (isComp) setIsComp(false);
    else setIsComp(true);
  };

  return (
    <div className="App">
      <h1 className="weather-to-go">Weather to Go</h1>
      {/* On/off button for compare */}
      <button className="compare" onClick={handleCompare}>
        Compare
      </button>
      <div className="content">
        {/* Display 1 weatherBox unless compare is true then display 2 */}
        <WeatherBox className="box1" />
        {isComp && <WeatherBox className="box2" />}
      </div>
    </div>
  );
}

export default App;
