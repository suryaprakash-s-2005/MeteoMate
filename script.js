const searchBar = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkData(city) {
    const response = await fetch(`/api/getWeather?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    console.log(data);

    const weatherContainer = document.querySelector(".weatherReport-container");
    const errorContainer = document.querySelector(".errorMessage");

    if (response.status === 404 || data.cod === "404") {
        weatherContainer.style.display = "none";
        errorContainer.style.display = "block";
        document.querySelector(".error").innerHTML = "OOPS ! Invalid City Name !";
    } else {
        errorContainer.style.display = "none";
        weatherContainer.style.display = "block";

        weatherContainer.classList.remove("fade-in");
        void weatherContainer.offsetWidth; 
        weatherContainer.classList.add("fade-in");

        const condition = data.weather[0].main;
        switch (condition) {
            case "Clouds":
                weatherIcon.src = "Sources/clouds.png";
                break;
            case "Drizzle":
                weatherIcon.src = "Sources/drizzle.png";
                break;
            case "Clear":
                weatherIcon.src = "Sources/clear.png";
                break;
            case "Mist":
                weatherIcon.src = "Sources/mist.png";
                break;
            case "Rain":
                weatherIcon.src = "Sources/rain.png";
                break;
            case "Snow":
                weatherIcon.src = "Sources/snow.png";
                break;
            case "Haze":
                weatherIcon.src = "Sources/haze.png";
                break;
            case "Smoke":
                weatherIcon.src = "Sources/smoke.png";
                break;
            case "Sand":
            case "Dust":
            case "Ash":
                weatherIcon.src = "Sources/sandstorm.png";
                break;
            case "Thunderstorm":
                weatherIcon.src = "Sources/thunderstorm.png";
                break;
            case "Tornado":
                weatherIcon.src = "Sources/tornado.png";
                break;
            case "Squall":
                weatherIcon.src = "Sources/squall.png";
                break;
            default:
                weatherIcon.src = "Sources/weather.png";
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;" + "C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/hr";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBar.value.trim() === "") {
        document.querySelector(".errorMessage").style.display = "block";
        document.querySelector(".weatherReport-container").style.display = "none";
        document.querySelector(".error").innerHTML = "Please enter a city name !";
    } else {
        checkData(searchBar.value.trim());
    }
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});