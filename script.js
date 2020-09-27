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


    var APIKey = "57f6ffb5470a18032bfd1ed78472b303";
    let cityNameInput = $("#searchInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#temp").append(response.main.temp);
        $("#windspeed").append(response.wind.speed);
        $("#humidity").append(response.main.humidity);
        $("#city").append(response.name);


    });


})