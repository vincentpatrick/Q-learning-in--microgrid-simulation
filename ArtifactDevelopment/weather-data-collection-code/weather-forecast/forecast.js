//-------------------------------CONFIGURATION--------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCiaGBC09ZygJaAFt2PDtQRLyazTxSAWdo",
    authDomain: "weather-data-collection-bea13.firebaseapp.com",
    databaseURL: "https://weather-data-collection-bea13-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "weather-data-collection-bea13",
    storageBucket: "weather-data-collection-bea13.appspot.com",
    messagingSenderId: "777724150682",
    appId: "1:777724150682:web:61080a4820700f21517023",
    measurementId: "G-YLR40934XY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//-------------------------------Ready Data--------------------------------------
const key = 'a51555a7cef91a68f44e602a900f355d';

//create a rootnode for firebase
const rootRef = firebase.database().ref('forecast-data/')

function weatherForecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city+ '&appid=' + key+'&cnt=5')  
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
        drawWeather(data);

        forecast_data =JSON.stringify(data)
        const autoId = rootRef.push().key//create an auto id,therefore data can be added instantly into a new child node seperated from previous data
              rootRef.child(autoId).set({ //from the root node, generate a new child with the new data.
                  forecast_data
              });
    })
    .catch(function() {
        // catch any errors
    });
}

function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    var description = d.weather[0].description; 
    
    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
    document.getElementById('location').innerHTML = d.name+' '+d.sys.country;
}



//Event Listeners on button click
document.addEventListener("DOMContentLoaded", () => {
    // Handling button click
    document.querySelector(".button-search").addEventListener("click", () => {
        const searchedCity = document.querySelector('.text-search');
        console.log(searchedCity.value);
        if(searchedCity.value){
            weatherForecast(searchedCity.value);
        }       
   }) 
 });

