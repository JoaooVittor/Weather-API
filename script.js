// Variaveis
const apiKey = "f8b8ecc79887e059d979a643c1448c2d";
const apiCountryFlag = `https://www.countryflagicons.com/FLAT/64/`;
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const errorMessage = document.querySelector('.error-message');
const load = document.querySelector('.loading');
const weatherData = document.querySelector("#weather-data");
const cityElement = document.querySelector('#city'); 
const tempElement = document.querySelector('#temperature span'); 
const descElement = document.querySelector('#description'); 
const weatherIconElement = document.querySelector('#weather-icon'); 
const countryElement = document.querySelector('#country'); 
const humidityElement = document.querySelector('#humidity span'); 
const windElement = document.querySelector('#wind span'); 


// Funçoes


const getWeatherData = async(city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if(data){
       return data;
    }
  
}


const showWeatherData = async (city)=>{
    errorMessage.style.display = 'none';
    weatherData.style.display = 'none';
    load.style.display = 'block'
    const data = await getWeatherData(city);
    

    try {
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = parseInt(data.main.temp);
        descElement.innerHTML = data.weather[0].description;
        weatherIconElement.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute('src', apiCountryFlag + `${ data.sys.country}.png`);
        humidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML =  `${data.wind.speed}km/h`
        weatherData.style.display = 'block';
        errorMessage.style.display = 'none';
        load.style.display = 'none'
    
    } catch (error) {
        weatherData.style.display = 'none';
        errorMessage.style.display = 'block';
        load.style.display = 'none'
    }
    

}






// Eventos
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(cityInput.value){
        const city = cityInput.value;
        cityInput.value = '';
        showWeatherData(city);
    }

})


cityInput.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(cityInput.value){
        const city = cityInput.value;
        cityInput.value = '';
        showWeatherData(city);
    }
})

