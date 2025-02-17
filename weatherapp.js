function refreshData(response) {
  let temperature = document.querySelector("#now-temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let condition = document.querySelector("#now-condition");
  condition.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#now-humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let windspeed = document.querySelector("#now-windspeed");
  windspeed.innerHTML = response.data.wind.speed;
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

let searchElement = document.querySelector("#search-element");
searchElement.addEventListener("submit", submitCity);

searchCity("Berlin");
