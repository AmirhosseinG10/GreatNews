"use strict";

const today_date = document.getElementsByClassName("date-box")[0];
const time = new Date().getHours();
setInterval(time, 40000);

function Set_Date() {
    let current_year = new persianDate().toLocale("fa").format("YYYY");
    let current_month = new persianDate().toLocale("fa").format("MMMM");
    let current_day_names = new persianDate().toLocale("fa").format("dddd");
    let current_day = new persianDate().toLocale("fa").format("DD");
    let current_hour = new persianDate().toLocale("fa").format("H");
    let current_min = new persianDate().toLocale("fa").format("mm");

    today_date.innerHTML =
        current_hour +
        ":" +
        current_min +
        " " +
        current_day_names +
        " " +
        current_day +
        " " +
        current_month +
        " " +
        current_year;
}

setInterval(Set_Date, 10000);

//----------------------------------------//
const search_icon = document.querySelector(".search-icon");
const search_box = document.querySelector(".search-box");

search_icon.addEventListener("click", function () {
    if (search_box.className === "search-box") {
        search_box.className += " show";
    } else {
        search_box.className = "search-box";
    }
});

//---------------------------------//
function set_weather() {
    // API key and endpoint URL
    let apiKey = "187841003ac76f61cca909894c856920"; //Enter your API key here
    let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

    let searchBox = document.querySelector(".search input");
    let searchButton = document.querySelector(".search button");
    let weather_icon = document.querySelector(".weather-icon");

    // Variable to store Celsius value
    let cel;

    // Function to check the weather for a city
    async function checkWeather(city) {
        try {
            // Make API call to fetch weather data
            const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

            if (!response.ok) {
                throw new Error("Unable to fetch weather data.");
            }

            // Parse the response JSON
            const data = await response.json();

            // Update the DOM with weather information

            /* document.querySelector(".city").innerHTML = data.name; */
            const tempCelcius = Math.round(data.main.temp);
            document.querySelector(".temp").innerHTML = tempCelcius + "°C";
            /*         document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%"; */
            // document.querySelector(".pressure").innerHTML = data.main.pressure;
            // Set the weather icon based on weather conditions
            if (data.weather[0].main === "Clouds") {
                weather_icon.classList = "fas fa-cloud weather-icon";
            } else if (data.weather[0].main === "Clear") {
                if (time >= 20 || time <= 6) {
                    weather_icon.classList = "fas fa-moon weather-icon";
                } else {
                    weather_icon.classList = "fas fa-sun weather-icon";
                }
            } else if (data.weather[0].main === "Rain") {
                weather_icon.classList = "fas fa-cloud-rain weather-icon";
            } else if (data.weather[0].main === "Drizzle") {
                weather_icon.classList =
                    "fas fa-cloud-showers-heavy weather-icon";
            } else if (data.weather[0].main === "Mist") {
                weather_icon.src = "../images/mist.png";
            }

            // Display the weather section and hide error message
            /*         document.querySelector(".weather").style.display = "block";
        document.querySelector(".err").style.display = "none"; */

            // Store the Celsius value
            cel = tempCelcius;
        } catch (error) {
            // Display error message and hide weather section
            /*         document.querySelector(".err").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error(error); */
        }
    }

    // Event listener for search button click
    /* searchButton.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        // Call checkWeather function with the entered city
        checkWeather(city);
    }
});
 */
    checkWeather("Tehran");

    // Event listener for Fahrenheit button click
    /* document.getElementById("farenheit").addEventListener("click", () => {
    // Convert Celsius to Fahrenheit and update the HTML
    if (cel !== undefined) {
        let fer = Math.floor(cel * 1.8 + 32);
        document.querySelector(".temp").innerHTML = fer + "°F";
    }
});

// Event listener for Celsius button click
document.getElementById("celcius").addEventListener("click", () => {
    // Restore the Celsius value and update the HTML
    if (cel !== undefined) {
        document.querySelector(".temp").innerHTML = cel + "°C";
    }
});
 */
}
set_weather();
setInterval(set_weather, 60000);


//-------------------------------------//

