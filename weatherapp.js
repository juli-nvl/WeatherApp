function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}

let searchElement = document.querySelector("#search-element");
searchElement.addEventListener("submit", submitCity);
