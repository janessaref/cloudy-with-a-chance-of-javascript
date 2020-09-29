/*
1. Use API key to grab values to display current weather
2. local storage and preprend cities
3. clor coding uv index
4. responsive icons according to the weather
*/


let cityArray = [];

let saveCityName = JSON.parse(localStorage.getItem("cityArray"));
console.log(saveCityName)
if (saveCityName !== null) {
    cityArray = saveCityName;
    renderButtons();
};


// Search button event listener
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    // grabs the input value from the search bar
    let searchCity = $("#searchInput").val();

    if (searchCity == null) {
        alert("invalid");
    }

    currentWeather();
    forecastFive();
    $("#removeBtn").remove();

    cityArray.push(searchCity);

    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    $("#searchInput").val("");
});

function currentWeather() {
    let APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    let cityNameInput = $("#searchInput").val();
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
            var uvBtn = $("<button>");
            uvBtn.html(response.value);
            uvBtn.attr("style", "height:80px");
            uvBtn.attr("style", "width:80px");
            uvBtn.attr("id", "removeBtn");


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
};

// need to change url to forecast and change response
function clickButtons() {
    let cityInfo = $(this).attr("data-name");

    let APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    // let cityBtnSide = $("#searchInput").val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInfo + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let cityDiv = $("<div class=\"citysave\">");
        let nameofCity = response.name;
        let cityH2 = $("<h2>").text(nameofCity);
        cityDiv.append(cityH2);

        let tempF = (((response.main.temp) - 273.15) * 1.80 + 32).toFixed(2);
        let tempLi = $("<li class=\"mb-3 ml-0\">").text("Temperature: " + tempF + " F");
        cityDiv.append(tempLi);
        let humid = response.main.humidity
        let humidLi = $("<li class=\"mb-3 ml-0\">").text("Humidity: " + humid + " %");
        cityDiv.append(humidLi);
        let wSpeed = response.wind.speed
        let wSpeedLi = $("<li class=\"mb-3 ml-0\">").text("Wind Speed: " + wSpeed + " MPH");
        cityDiv.append(wSpeedLi);
        $("#current-weather").prepend(cityDiv);
    });

}

function renderButtons() {

    $("#addCityBtn").empty();

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

function forecastFive() {
    let cityNameInput = $("#searchInput").val();

    let APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let wIcon = response.list[3].weather[0].icon;
        let iconLink = "http://openweathermap.org/img/wn/" + wIcon + "@2x.png";
        let wDescription = response.list[0].weather[0].description;

        // DAY ONE
        $("#date1").text(moment().format("(M/DD/YYYY)"));

        $("#icon1").attr("src", iconLink);
        $("#icon1").attr("style", "height:80px; width:80px");
        $("#icon1").attr("alt", wDescription);

        let tempF = (((response.list[0].main.temp) - 273.15) * 1.80 + 32).toFixed(2);
        $("#temp1").text("Temp: " + tempF);

        $("#humidity1").text("Humidity: " + response.list[0].main.humidity + " %");

        // // DAY TWO
        // $("#date2").text(response.list[0].dt_text);

        // $("#icon2").attr("src", iconLink);
        // $("#icon2").attr("style", "height:60px; width:60px");
        // $("#icon2").attr("alt", wDescription);

        // let tempF = (((response.list[0].main.temp) - 273.15) * 1.80 + 32).toFixed(2);
        // $("#temp2").text("Temp: " + tempF);

        // $("#humidity2").text("Humidity: " + response.list[0].main.humidity + " %");


        // // DAY THREE
        // $("#date3").text(response.list[0].dt_text);

        // $("#icon3").attr("src", iconLink);
        // $("#icon3").attr("style", "height:60px; width:60px");
        // $("#icon3").attr("alt", wDescription);

        // let tempF = (((response.list[0].main.temp) - 273.15) * 1.80 + 32).toFixed(2);
        // $("#temp3").text("Temp: " + tempF);

        // $("#humidity3").text("Humidity: " + response.list[0].main.humidity + " %");


        // // DAY FOUR
        // $("#date4").text(response.list[0].dt_text);

        // $("#icon4").attr("src", iconLink);
        // $("#icon4").attr("style", "height:60px; width:60px");
        // $("#icon4").attr("alt", wDescription);

        // let tempF = (((response.list[0].main.temp) - 273.15) * 1.80 + 32).toFixed(2);
        // $("#temp4").text("Temp: " + tempF);

        // $("#humidity4").text("Humidity: " + response.list[0].main.humidity + " %");


        // //DAY FIVE
        // $("#date5").text(response.list[0].dt_text);

        // $("#icon5").attr("src", iconLink);
        // $("#icon5").attr("style", "height:60px; width:60px");
        // $("#icon5").attr("alt", wDescription);

        // let tempF = (((response.list[0].main.temp) - 273.15) * 1.80 + 32).toFixed(2);
        // $("#temp5").text("Temp: " + tempF);

        // $("#humidity5").text("Humidity: " + response.list[0].main.humidity + " %");


    });

}

function uvColorIndex() {

}

$(document).on("click", ".newCityBtn", clickButtons);


// let divForecast = $("<div class=\"card text-white bg-info mb-3 mx-auto col-auto>");
// divForecast.attr("style", "max-width:15rem");
// let divBody = $("<div class=\"card-body>");
// divForecast.append(divBody);

// let pForecast = $("<p>")