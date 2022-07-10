const loading = document.querySelector('.loading');
const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-btn')
const searchCity = document.querySelector('.search-city');
const navSearch = document.querySelector('.nav-search');
const navSrcClose = document.querySelector('.nav-search-close');

const navSearchInput = document.querySelector('.nav-search-input');
const navSearchButton = document.querySelector('.nav-search-button');





let units = "metric";
let apiKey = "00484987152255e2d06f78d9149a1649";
// Loading run
setTimeout(() => {
  loading.style.display = 'none';
  container.style.display = 'flex';
}, 1000);

searchBtn.addEventListener('click',()=> {


  searchCity.style.display = 'none';
  navSearch.style.display = 'flex' ;

})
navSrcClose.addEventListener('click',()=>{
  searchCity.style.display = 'block'
  navSearch.style.display = 'none'
})





const getCurrentWeatherData = async (city) => {


let lang = "tr";

let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=1723148a77444853837f03372fba544a&days=6`;
try {
  const response = await axios(url)

  
  const {data,country_code,city_name} = response.data


if (typeof data=='undefined') {
  document.querySelector('.valid-city').style.display= 'block';
  navSearchInput.value =''

}else {
  document.querySelector('.nav-search-result-ul').innerHTML += `<li class="nav-search-result-li btnn" onclick= "setWeatherData()">
  <button class="nav-search-result-btn " ><span class="nav-search-result-spn">${city_name}</span>,<span> ${country_code}</span></button><svg
    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="icon" height="1em"
    width="1em" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z">
    </path>
  </svg>
</li>`
}

  let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return   
} catch (err) {
  return err
}
}

navSearchButton.addEventListener('click', () =>{
 if (navSearchInput.value) {

  let city = navSearchInput.value
  getCurrentWeatherData(city)
}


})
 // datayı çek yerleştir

 const setWeatherData = async () => {
 const citY = document.querySelector('.nav-search-result-spn').textContent

   let lang = "tr";
   
   let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${citY}&key=1723148a77444853837f03372fba544a&days=6`;
   try {
     const response = await axios(url)
     const {data,country_code,city_name} = response.data
   
     document.querySelector('.nav-search-result-ul').innerHTML =''
     navSearchInput.value ='';
     searchCity.style.display = 'block'
  navSearch.style.display = 'none'
  // fahrenayt celcious
    let x =1
    document.querySelector('.celci-s').innerText ='°C'
    
    const {wind_cdir,temp,weather}= data[0]
    
    // weather icons
    let iconUrl;
 
    
    switch (weather.code) {
      case 201:
      case 202:
      case 200:
      case 230:
      case 231:
      case 232:
      case 233:
      
        iconUrl ='./assets/img/Thunderstorm.png'
        break;
      case 300:
      case 301:
      case 302:
      case 511:
      case 611:
      case 612:
        iconUrl ='./assets/img/Sleet.png'
        break;
      case 500:
      case 501:

   

        iconUrl ='./assets/img/LightRain.png'
        break;
      case 502:
      case 522:

        iconUrl ='./assets/img/HeavyRain.png'
        break;  
      case 601:
      case 621:


        iconUrl ='./assets/img/Snow.png'
        break;
      case 622:
      case 623:
        iconUrl ='./assets/img/Hail.png'
        break;
      case 521:
      case 520:
      case 522:
        iconUrl ='./assets/img/Shower.png'
        break; 
        case 800:
        iconUrl ='./assets/img/Clear.png'
        break;
        case 801:
        case 802:
        case 700:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        iconUrl ='./assets/img/LightCloud.png'
        break;
      case 803:
      case 804:
      case 900:
        iconUrl ='./assets/img/HeavyCloud.png'
    }
     console.log(wind_cdir);
     
     // set data first page
    //celcious
     document.querySelector('.degree-s span').innerText = String(temp*x).split('.')[0];
    // weather desc
    document.querySelector('.w-desc').innerText =weather.description;

    // img icon
    document.querySelector('.w-img').src = iconUrl;



   }
   catch(err){ 
    document.querySelector('.enter-city').style.display='block';
      document.querySelector('.enter-city').innerText = `${err.message}`
    setTimeout(() =>{
      navSearchInput.value ='';
      document.querySelector('.enter-city').style.display='none';
    },5000)
    
   
     
   }}