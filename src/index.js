import React from "react";
import ReactDOM from "react-dom/client";
import "./CSS/index.css";
import "./CSS/info.css";
import "./CSS/weather-box.css";
import "./CSS/search.css";
import "./CSS/dropdown.css";
import App from "./JavaScript/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
