/*
1. Use API key to grab values to display current weather
2. local storage and preprend cities
3. clor coding uv index
4. responsive icons according to the weather
*/

$(document).ready(function() {

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

        if (searchCity == "") {
            alert("invalid");
            $("#searchInput")
        }
        // if (searchCity == cityArray.value) {

        // }

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

            // let trashIcon = "<svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/> <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg>"

            let cityBtn = $("<button>");
            cityBtn.addClass("newCityBtn");
            cityBtn.addClass("list-group-item");
            cityBtn.addClass("list-group-item-action");
            cityBtn.attr("type", "button");
            // cityBtn.html(trashIcon);
            cityBtn.attr("data-name", cityArray[j]);
            cityBtn.text(cityArray[j]);
            $("#addCityBtn").prepend(cityBtn);

        };

    };

    function dailyForecast(num, weatherInfo) {
        let dateEl = "#date" + num;
        let iconEl = "#icon" + num;
        let tempEl = "#temp" + num;
        let humidEl = "#humidity" + num
        let dateText = new Date(weatherInfo.dt_txt).toLocaleString().split(",");

        let iconLink = "http://openweathermap.org/img/wn/" + weatherInfo.weather[0].icon + "@2x.png";

        $(dateEl).text(dateText[0]);
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

            let responseNum = 0;
            for (let i = 1; i <= 5; i++) {
                dailyForecast(i, response.list[responseNum]);
                responseNum += 8;
            }


        });

    }

    $(document).on("click", ".newCityBtn", clickButtons);

    // function invalidInput() {
    //     if ($("#searchInput") == "") {
    //         $("#error").html("Invalid input");
    //         $("error").show();
    //     } else {
    //         $("error").html("");
    //         $("error").hide();
    //     }
    // }
});