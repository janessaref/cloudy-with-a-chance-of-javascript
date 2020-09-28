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
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    // grabs the input value from the search bar
    let searchCity = $("#searchInput").val().trim();
    console.log(searchCity);

    renderButtons();

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



        let coordLon = response.coord.lon;
        let coordLat = response.coord.lat;

        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coordLat + "&lon=" + coordLon + "&appid=" + APIKey;


        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(response) {

            $("#uvindex").text("UV Index: " + response.value);



        });



    });




};
// let latCity = "";
// let lonCity = "";



// $(document).on("click",)


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
        // let farenheit = ((response.main.temp) - 273.15) * 1.80 + 32;
        // let twodecimalF = farenheit.toFixed(2);
        let tempLi = $("<li class=\"mb-3 ml-0\">").text("Temperature: " + tempF + " F");
        cityDiv.append(tempLi);

        let humid = response.main.humidity
        let humidLi = $("<li class=\"mb-3 ml-0\">").text("Humidity: " + humid + " %");
        cityDiv.append(humidLi);

        let wSpeed = response.wind.speed
        let wSpeedLi = $("<li class=\"mb-3 ml-0\">").text("Wind Speed: " + wSpeed + " MPH");
        cityDiv.append(wSpeedLi);
        $("#current-weather").prepend(cityDiv);


        // $("#city").text(response.name);
        // $("#temp").text("Temperature: " + twodecimalF + " F");
        // $("#humidity").text("Humidity: " + response.main.humidity + "%");
        // $("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH");

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

    }


}


$(document).on("click", ".newCityBtn", clickButtons);