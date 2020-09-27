/*
1. Use API key to grab values to display current weather
2. local storage and preprend cities
3. clor coding uv index
4. responsive icons according to the weather
*/




// Search button event listener
$("#searchBtn").on("click", function() {

    let searchCity = $("#searchInput").val();
    console.log(searchCity);

    $("#addCityBtn").prepend("<button type=\"button\" class=\"list-group-item list-group-item-action\">" + searchCity + "</button>");
    currentWeather();

});


function currentWeather() {
    let APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    let cityNameInput = $("#searchInput").val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + APIKey;

    // let apiMainBox = "";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var farenheit = ((response.main.temp) - 273.15) * 1.80 + 32;
        let twodecimalF = farenheit.toFixed(2);
        $("#city").text(response.name);
        $("#temp").text("Temperature: " + twodecimalF + " F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH");




    });
};