import { useState } from "react";
import WeatherBox from "./WeatherBox";

function App() {
  const [isComp, setIsComp] = useState(false);
  const handleCompare = () => {
    if (isComp) setIsComp(false);
    else setIsComp(true);
  };

  return (
    <div className="App">
      <div className="content">
        <button className="compare" onClick={handleCompare}>
          Compare...
        </button>
        <WeatherBox />
        {isComp && <WeatherBox />}
      </div>
    </div>
  );
}

export default App;
