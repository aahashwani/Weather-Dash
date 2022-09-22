// var apiKey = "a4b7d9be4b78280c3470b24571062252"
var apiKey = "7d1b285353ccacd5326159e04cfab063"
function addWeather(){

    inputCity = document.getElementById("userInput").value;  
    oldList = weatherInfo();
    let searchCity =$("<div>") 
    searchCity.attr('id',inputCity) 
    searchCity.text(inputCity) 
    searchCity.addClass("h4")

    
    if (oldList.includes(inputCity) === false){
        $(".record").append(searchCity)
    }
    $(".subText").attr("style","display:inline")
    addWeatherInfo(inputCity);
    
}; 

$(".record").on('click', function(e){
    e.preventDefault();
    $(".subText").attr("style","display:inline")
     document.getElementById("userInput").value =  e.target.id;
    getWeather(); 
});

document.getElementById("searchBtn").addEventListener("click", addWeather);
document.getElementById("searchBtn").addEventListener('click', getWeather);

function getWeather(){   

    $(".five-day-forecast").empty();
    $(".city").empty()

   inputCity = document.getElementById("userInput").value;   
    let whatCountry='';    
    let whatCity=inputCity;       
    
    let theLon;   
    let theLat;
        
    let cityName =$("<h>")    
    cityName.addClass("h3")  
    let temp = $("<div>")    
    let wind = $("<div>")    
    let humidity = $("<div>")   
    let icon =$("<img>")
    icon.addClass("icon");    
    let dateAndTime = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName)    
    $(".city").append(dateAndTime)    
    $(".city").append(icon)    
    $(".city").append(temp)    
    $(".city").append(wind)    
    $(".city").append(humidity)    
    
    
    let url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + whatCity 
    + "," + whatCountry 
    + "&limit=5&appid=" + apiKey;
        
      fetch(url)
    
        .then(function (r) {
          return r.json();
        })
    
        .then(function (d) {
          theLon = d[0].lon;
          theLat = d[0].lat;
    
          let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + theLat 
          + "&lon=" + theLon 
          + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
            
          fetch(weatherUrl)

          .then(function (r) {
            return r.json();
          })
          .then(function (weatherData) {
            
            weatherIcon= weatherData.current.weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
            icon.attr('src',imgSrc)
        
            cityName.text(whatCity);

            let date = new Date(weatherData.current.dt * 1000);
            dateAndTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

            temp.text("Temperature: "+ weatherData.current.temp + " °F");
            humidity.text("Humidity: " + weatherData.current.humidity + " %");
            wind.text("Wind Speed: " + weatherData.current.wind_speed + " MPH");


            for (let i=1; i<6; i++){

                let weatherBoxInfo = $("<div>")
                this["futureDate"+i] = $("<h>")
                this["futureIcon"+i] = $("<img>")
                this["futureTemp"+i] = $("<div>")
                this["futureWind"+i] = $("<div>")
                this["futureHumidity"+i] = $("<div>")
                //translate utc to date
                this["forecastDay"+i] = new Date(weatherData.daily[i].dt * 1000);     
     
                (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
                (this["futureTemp"+i]).text("Temperature: "+ weatherData.daily[i].temp.day + " °F");
                (this["futureWind"+i]).text("Wind: "+ weatherData.daily[i].wind_speed+ " MPH");
                (this["futureHumidity"+i]).text("Humidity: " + weatherData.daily[i].humidity + " %");
                (this["weatherIcon"+i])= weatherData.daily[i].weather[0].icon;
        
                DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";  
                (this["futureIcon"+i]).attr('src',DateimgSrc)

                $(".five-day-forecast").append(weatherBoxInfo)
                weatherBoxInfo.append((this["futureDate"+i]));
                weatherBoxInfo.append((this["futureIcon"+i]));
                weatherBoxInfo.append((this["futureTemp"+i]));
                weatherBoxInfo.append((this["futureWind"+i]));
                weatherBoxInfo.append((this["futureHumidity"+i]));

                weatherBoxInfo.addClass("weather-card")
            }

          })
    })
}

function weatherInfo() {
    let currentList =localStorage.getItem("city");
    if (currentList !== null ){
        refreshedList = JSON.parse(currentList);
        return refreshedList;
    } else {
        refreshedList = [];
    }
    return refreshedList;
}
function addWeatherInfo (n) {
    let newList = weatherInfo();

    if (oldList.includes(inputCity) === false){
        newList.push(n);
    }
   
    localStorage.setItem("city", JSON.stringify(newList));
};

function renderWeatherInfo () {
    let oldList = weatherInfo();
    for (let i = 0; i < oldList.length; i++) {
        let inputCity = oldList[i];
        let searchCity =$("<div>") 
        searchCity.attr('id',inputCity) 
        searchCity.text(inputCity) 
        searchCity.addClass("h4")

        $(".record").append(searchCity)
    }
};

renderWeatherInfo();
