const apiKey = "8af2bbb21f53da214a16d3153f67c6a3";
const iconurl = "http://openweathermap.org/img/w/";

const searchBtn = document.querySelector(".search");
const inputField = document.querySelector(".input-city");

const weatherSection = document.getElementById("weather");
const cityName = document.getElementById("city-name");

/** An Array to hold string values of days **/
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

/** This will fetch data from the api and return the results to be processed **/
function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
    {
      more: "cors"
    }
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      renderData(response.list);
      //We send the recieved data to this function where it will be displayed to the user
    })
    .catch(function(error) {
      alert("Could not find your city, please try again");
      //If an error is recieved back from the api response we will display an error alert to the user
    });
}

// An event listener that will run the following code when a click is detected on the search button
searchBtn.addEventListener("click", event => {
  if (inputField.value !== "") {
    fetchWeather(inputField.value);
  }
});

inputField.addEventListener("keyup", event => {
  if(event.keyCode === 13){
    if(inputField.value !== ""){
      fetchWeather(inputField.value);
    }
  }
});

function showCity(){
    cityName.textContent =
    inputField.value.charAt(0).toUpperCase() + inputField.value.substr(1);
}

//We will extract the relevant data from the json response and display it to the user
function renderData(weatherData) {
  showCity();
  
  if (!weather.hasChildNodes()) {
    //We will cycle through the array of 40 elements and just fetch the data for the 5-days of weather forecasts
    for (let i = 0; i < weatherData.length; i += 8) {
      let stringDate = weatherData[i].dt_txt;
      let date = new Date(stringDate);//This will return a date object which will be a number representing the number of a day
      let maxTemp = Math.round(weatherData[i].main.temp_max - 32) * 5 / 9;
      maxTemp = ~~maxTemp; //Quick trick to use Math.Floor()

      //We create a div element, that will have a set structure to display the weater forecast
      let dayBlock = document.createElement("div");
      dayBlock.className = "day-weather";
      dayBlock.innerHTML =
        '<div class="heading">' +
        '<h2 class="day">' +
        days[date.getDay()] +
        "</h2>" +
        '<h4 class="weather-condition">' +
        weatherData[i].weather[0].main +
        "</h4>" +
        "</div>" +
        '<div class="forecast">' +
        '<img class="weather-icons" src="' +
        iconurl +
        weatherData[i].weather[0].icon +
        ".png" +
        '">' +
        "</div>" +
        '<div class="day-temp">' +
        '<p class="temperature">' +
        maxTemp +
        `\u00B0` +
        "C" +
        "</p>" +
        "</div>";

      weatherSection.appendChild(dayBlock);
    }
  } else {
    let j = 0;

    const weatherCondition = document.getElementsByClassName(
      "weather-condition"
    );
    const day = document.getElementsByClassName("day");
    const weatherIcons = document.getElementsByClassName("weather-icons");
    const temperature = document.getElementsByClassName("temperature");

    for (let i = 0; i < weatherData.length; i += 8) {
      let stringDate = weatherData[i].dt_txt;
      let date = new Date(stringDate);
      let maxTemp = Math.round(weatherData[i].main.temp_max - 32) * 5 / 9;
      maxTemp = ~~maxTemp;

      weatherCondition[j].innerText = weatherData[i].weather[0].main;
      day[j].innerText = days[date.getDay()];
      weatherIcons[j].src = iconurl + weatherData[i].weather[0].icon + ".png";
      temperature[j].innerText = maxTemp + `\u00B0` + "C";
      j++;
    }
  }
}
