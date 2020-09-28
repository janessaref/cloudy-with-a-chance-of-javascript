/*
1. Use API key to grab values to display current weather
2. local storage and preprend cities
3. clor coding uv index
4. responsive icons according to the weather
*/


let cityArray = [];
// let newCityBtn = $(".newCity");
// console.log(newCityBtn.length);

let saveCityName = JSON.parse(localStorage.getItem("cityArray"));
console.log(saveCityName)
if (saveCityName !== null) {
    for (let i = 0; i < cityArray.length; i++) {
        cityArray[i].value = cityArray[i];
        // $("#addCityBtn")(cityArray[i]);
    };
};

// Search button event listener
$("#searchBtn").on("click", function() {

    let searchCity = $("#searchInput").val();
    console.log(searchCity);

    $("#addCityBtn").prepend("<button type=\"button\" class=\"list-group-item list-group-item-action newCity\">" + searchCity + "</button>");
    currentWeather();

    // let cityName = $("#searchInput");
    // allows the field/textarea to be empty
    // cityArray = [];

    // pushes values into the array saveToDo
    // for (var j = 0; j < cityName.length; j++) {
    //     cityArray.push(cityName[j].value);
    // };
    cityArray.push(searchCity);

    localStorage.setItem("cityArray", JSON.stringify(cityArray));
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
        let farenheit = ((response.main.temp) - 273.15) * 1.80 + 32;
        let twodecimalF = farenheit.toFixed(2);
        $("#city").text(response.name);
        $("#temp").text("Temperature: " + twodecimalF + " F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH");



    });
    let latCity = "";
    let lonCity = "";

    let uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + "&lon=" + "&appid=" + APIKey;
};