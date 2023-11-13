document.getElementById("click").addEventListener("click", function(){
    getData()
})

function getData(preCity) {
    var city = preCity || document.getElementById("search").value
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fba95e547d364b69bffed66389db1511&units=metric`
    fetch(url).then(res=>res.json()).then(data=>{
        displayWeather(data)
        display5Day(data)
        storeCity(data.city.name)
    })
}

function displayWeather(weatherData) {
    document.getElementById("city-name").innerText=weatherData.city.name
    var currentDay = weatherData.list[0]
    document.getElementById("date").innerText= dayjs.unix(currentDay.dt).format("MM/DD/YYYY")
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}.png`
    document.getElementById("temp").innerText= "temp: "+ currentDay.main.temp
    document.getElementById("humid").innerText="humid: "+ currentDay.main.humidity
    document.getElementById("wind").innerText="wind: "+ currentDay.wind.speed
}

function display5Day(weatherData) {
    var container = document.getElementById("5Day")
    container.innerHTML=''
    for(var i=7; i<weatherData.list.length; i+=8) {
        var day = weatherData.list[i]
        
        var card = document.createElement("section")

        card.classList.add("forecast-card")

        container.appendChild(card)

        var date = document.createElement("p")

        date.innerText = dayjs.unix(day.dt).format("MM/DD/YYYY")

        card.appendChild(date)   

        var icon = document.createElement("img")

        icon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`

        card.appendChild(icon)

        var temp = document.createElement("p")

        temp.innerText = "temp: "+ day.main.temp

        card.appendChild(temp)

        var humid = document.createElement("p")

        humid.innerText = "humid: "+ day.main.humidity

        card.appendChild(humid)

        var wind = document.createElement("p")

        wind.innerText = "wind: "+ day.wind.speed

        card.appendChild(wind)
        
        container.appendChild(card)    
    }
}

function storeCity(city) {
    var history = JSON.parse(localStorage.getItem("cities")) || []      
    if(!history.includes(city)) {
        history.push(city)
        localStorage.setItem("cities", JSON.stringify(history))
    }
    displayHistory(history)
}


function displayHistory(history) {
    var container = document.getElementById("history")
    container.innerHTML=''
    for(var i=0; i<history.length; i++) {
        var button = document.createElement("button")
        button.innerText= history[i]
        button.addEventListener("click", function(event){
            getData(event.target.innerText)
        })
        container.appendChild(button)
    }
}

displayHistory(JSON.parse(localStorage.getItem("cities")) || [])