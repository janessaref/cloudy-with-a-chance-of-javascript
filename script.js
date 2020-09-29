/*
1. Use API key to grab values to display current weather
2. local storage and preprend cities
3. clor coding uv index
4. responsive icons according to the weather
*/


let cityArray = [];

let saveCityNames = JSON.parse(localStorage.getItem("cityArray"));
console.log(saveCityNames)
if (saveCityNames !== null) {
    cityArray = saveCityNames;
    renderButtons();
    currentWeather(cityArray[cityArray.length - 1])
};


// Search button event listener
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    // grabs the input value from the search bar
    let searchCity = $("#searchInput").val().trim();

    if (searchCity == null) {
        alert("invalid");
        $("#searchInput").focus()
    }
    if (searchCity == cityArray.value) {

    }

    currentWeather(searchCity);
    // $("#removeBtn").remove();

    cityArray.push(searchCity);

    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    $("#searchInput").val("");
});

function currentWeather(cityNameInput) {
    let APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let farenheit = ((response.list[3].main.temp) - 273.15) * 1.80 + 32;
        let twodecimalF = farenheit.toFixed(2);
        $("#city").text(response.city.name + " " + moment().format("(M/DD/YYYY)"));
        $("#temp").text("Temperature: " + twodecimalF + " F");
        $("#humidity").text("Humidity: " + response.list[3].main.humidity + "%");
        $("#windspeed").text("Wind Speed: " + response.list[3].wind.speed + " MPH");

        let coordLon = response.city.coord.lon;
        let coordLat = response.city.coord.lat;
        let wIcon = response.list[3].weather[0].icon;
        let iconLink = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";
        let wDescription = response.list[3].weather[0].description;
        console.log(wDescription);

        var imgTag = $("<img>");
        imgTag.attr("src", iconLink);
        imgTag.attr("style", "height:60px; width: 60px");
        imgTag.attr("alt", wDescription);
        $("#city").append(imgTag);

        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coordLat + "&lon=" + coordLon + "&appid=" + APIKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(response) {
            renderButtons();
            var uvBtn = $("#uvbutton");
            uvBtn.html(response.value);
            // uvBtn.attr("style", "height:80px");
            // uvBtn.attr("style", "width:80px");
            // uvBtn.attr("id", "removeBtn");


            // $("#uvindex").text("UV Index: " + response.value);

            var uvNumber = +response.value;

            if (uvNumber >= 11) {
                uvBtn.addClass("purple");
            } else if (uvNumber >= 8 && uvNumber < 11) {
                uvBtn.addClass("red");
            } else if (uvNumber >= 6 && uvNumber < 8) {
                uvBtn.addClass("orange");
            } else if (uvNumber >= 3 && uvNumber < 6) {
                uvBtn.addClass("yellow");
            } else if (uvNumber >= 0 && uvNumber < 3) {
                uvBtn.addClass("green");
            }
            $("#uvindex").append(uvBtn);

        });
    });
    forecastFive(cityNameInput);
};

// need to change url to forecast and change response
function clickButtons() {
    let cityInfo = $(this).attr("data-name");
    currentWeather(cityInfo);
}

function renderButtons() {

    $("#addCityBtn").empty();

    let uniqueSet = new Set(cityArray);
    cityArray = [...uniqueSet];

    for (var j = 0; j < cityArray.length; j++) {

        let cityBtn = $("<button>");
        cityBtn.addClass("newCityBtn");
        cityBtn.addClass("list-group-item");
        cityBtn.addClass("list-group-item-action");
        cityBtn.attr("type", "button");
        cityBtn.attr("data-name", cityArray[j]);
        cityBtn.text(cityArray[j]);
        console.log(cityBtn);
        $("#addCityBtn").prepend(cityBtn);

    };

};

function dailyForecast(num, weatherInfo) {
    let dateEl = "#date" + num;
    let iconEl = "#icon" + num;
    let tempEl = "#temp" + num;
    let humidEl = "#humidity" + num;
    let dtText = new Date();

    let iconLink = "http://openweathermap.org/img/wn/" + weatherInfo.weather[0].icon + "@2x.png";

    $(dateEl).text(dtText.toDateString(weatherInfo.dt_txt));
    $(iconEl).attr("src", iconLink);
    $(iconEl).attr("style", "height:80px; width:80px");
    $(iconEl).attr("alt", weatherInfo.weather[0].description);
    $(tempEl).text("Temp: " + (((weatherInfo.main.temp) - 273.15) * 1.80 + 32).toFixed(2) + " F");
    $(humidEl).text("Humidity: " + weatherInfo.main.humidity + "%");
}

function forecastFive(cityNameInput) {

    let APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // let wIcon = response.list[0].weather[0].icon;
        // let iconLink = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";
        // let wDescription = response.list[0].weather[0].description;

        let responseNum = 0;
        for (let i = 1; i <= 5; i++) {
            dailyForecast(i, response.list[responseNum]);
            responseNum += 8;
        }


    });

}

$(document).on("click", ".newCityBtn", clickButtons);


// let divForecast = $("<div class=\"card text-white bg-info mb-3 mx-auto col-auto>");
// divForecast.attr("style", "max-width:15rem");
// let divBody = $("<div class=\"card-body>");
// divForecast.append(divBody);

// let pForecast = $("<p>")