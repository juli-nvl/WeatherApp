function refreshData(response) {
  let temperature = document.querySelector("#now-temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let icon = document.querySelector("#now-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather-icon"></img>`;
  let date = new Date(response.data.time * 1000);
  let time = document.querySelector("#time");
  time.innerHTML = formatDate(date);
  let condition = document.querySelector("#now-condition");
  condition.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#now-humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let windspeed = document.querySelector("#now-windspeed");
  windspeed.innerHTML = response.data.wind.speed;
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "7043o377bb0t07ffedfea40179990f35";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshData);
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7043o377bb0t07ffedfea40179990f35";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="data-forecast">
        <div class="forecast-day">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>

          <div class="forecast-temperature-min">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchElement = document.querySelector("#search-element");
searchElement.addEventListener("submit", submitCity);

searchCity("Berlin");
