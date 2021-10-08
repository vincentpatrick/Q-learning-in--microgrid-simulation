var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var temp_min = document.querySelector('.temp_min');
var temp_max = document.querySelector('.temp_max');
var pressure = document.querySelector('.pressure');
var humidity = document.querySelector('.humidity');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');

// button listen to aclick, in the click it runs a function
button.addEventListener('click', function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=a51555a7cef91a68f44e602a900f355d')
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => { //store the data
        
        var tempValue = data['main']['temp']-273.15;
        var temp_minValue = data['main']['temp_min']-273.15;
        var temp_maxValue = data['main']['temp_max']-273.15;
        var pressureValue = data['main']['pressure'];
        var humidityValue = data['main']['humidity'];
        var nameValue = data['name'];
        var descValue = data['weather'][0]['description'];
      
        main.innerHTML = nameValue;
        desc.innerHTML = "Desc : "+descValue;
        
        temp.innerHTML = "Temperature : "+tempValue.toFixed(2);
        temp_min.innerHTML = "Temperature (minimum) : "+temp_minValue.toFixed(2);
        temp_max.innerHTML = "Temperature (maximum) : "+temp_maxValue.toFixed(2);
        pressure.innerHTML = "pressure : "+pressureValue.toFixed(2)
        humidity.innerHTML = "Humidity : "+humidityValue.toFixed(2)
        
        input.value ="";
    })

.catch(err => alert("Wrong city name!")); //if city doesnt exist, catch it
})
