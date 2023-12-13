# Weather To Go

This project uses [https://openweathermap.org](https://openweathermap.org) api for weather imformation.

## Instaling locally

### `git clone https://github.com/TheMythicalOX/weather-app.git`

Clones github repository

### `npm install`

Installs all dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Make a new file called ".env" and inside put "REACT_APP_API_KEY=" then put your own openweathermap api key (they have a free option)

e.g. REACT_APP_API_KEY=00000000000000000000000000000000

## Break Down

### idex.js

Imports css files, and creates DOM element that renders App.js.

### App.js

Renders HTML of the page name, a compare button, and either 1 or 2 WeatherBox components depending on if the compare button has been clicked.

### WeatherBox.js

Renders a text input and search button. When 3 characters have been typed in the text input, a dropdown menue is rendered. When an item in the dropdown menue is clicked, or the search button is clicked, or enter is pressed while in focus, a function is called to fetch the data from openweathermap and set the data. Then Displayinfo is rendered with the data passed via props.

### Dropdown.js

Renders all locations, within the data set, that start with the users input, and is limited to 5.

### DisplayInfo.js

Renders all information passed to it when the data has been set,

### ChangeUsits.js

When the sign button has been clicked, it changes the data to the opposite unit system by calling a function, and flips the button to appear as the correct system.
