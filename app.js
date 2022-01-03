let btn = document.querySelector("#btn");

btn.addEventListener("click", getData);

function getData() {
  document.querySelector("#name").innerHTML = "";
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#min_temp").innerHTML = "";
  document.querySelector("#max_temp").innerHTML = "";
  document.querySelector("#humidity").innerHTML = "";
  document.querySelector("#wind_speed").innerHTML = "";
  document.querySelector("#visibility").innerHTML = "";
  document.querySelector("#description").innerHTML = "";
  let input = document.querySelector("#weather").value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=e15c5e05f9261b96f3efdbd86e09b69e`
    )
    .then(function (res) {
      let divForName = document.createElement("div");
      let nameOfCity = res.data.name;
      let nameOfCountry = res.data.sys.country;
      divForName.innerHTML = `${nameOfCity}, ${nameOfCountry}`;
      document.querySelector("#name").appendChild(divForName);

      let divForTemp = document.createElement("div");
      let tempInKelvin = res.data.main.temp;
      let tempInCelsius = (tempInKelvin - 273.15).toFixed(2);
      divForTemp.innerHTML = "Current Temperature: " + tempInCelsius + "°C";
      document.querySelector("#results").appendChild(divForTemp);

      let divForMinTemp = document.createElement("div");
      let minTempInKelvin = res.data.main.temp_min;
      let minTempInCelsius = (minTempInKelvin - 273.15).toFixed(2);
      divForMinTemp.innerHTML =
        "Minimum Temperature: " + minTempInCelsius + "°C";
      document.querySelector("#min_temp").appendChild(divForMinTemp);

      let divForMaxTemp = document.createElement("div");
      let maxTempInKelvin = res.data.main.temp_max;
      let maxTempInCelsius = (maxTempInKelvin - 273.15).toFixed(2);
      divForMaxTemp.innerHTML =
        "Maximum Temperature: " + maxTempInCelsius + "°C";
      document.querySelector("#max_temp").appendChild(divForMaxTemp);

      let divForHumidity = document.createElement("div");
      let humidity = res.data.main.humidity;
      divForHumidity.innerHTML = "Humidity: " + humidity + "%";
      document.querySelector("#humidity").appendChild(divForHumidity);

      let divForWindSpeed = document.createElement("div");
      let windSpeed = res.data.wind.speed;
      divForWindSpeed.innerHTML = "Wind Speed: " + windSpeed + "m/s";
      document.querySelector("#wind_speed").appendChild(divForWindSpeed);

      let divForVisibility = document.createElement("div");
      let visibilityInMetres = res.data.visibility;
      let visibilityInKilometres = `${visibilityInMetres / 100} km`;
      divForVisibility.innerHTML = "Visibility: " + visibilityInKilometres;
      document.querySelector("#visibility").appendChild(divForVisibility);

      let divForDescription = document.createElement("div");
      let description = res.data.weather[0].description;
      divForDescription.innerHTML = "Description: " + description;
      document.querySelector("#description").appendChild(divForDescription);
    })
    .catch(function () {
      document.querySelector("#results").innerHTML = "Cannot find given city.";
    });
}
