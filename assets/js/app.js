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
  container.style.display = 'block';
}, 1000);

searchBtn.addEventListener('click',()=> {

  
  searchCity.style.display = 'none'
  navSearch.style.display = 'flex'
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
  document.querySelector('.nav-search-result-ul').innerHTML += `<li class="nav-search-result-li btnn" onclick= "setWeatherData(${city_name})">
  <button class="nav-search-result-btn " ><span class="nav-search-result-spn">${city_name}, ${country_code}</span></button><svg
    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="icon" height="1em"
    width="1em" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z">
    </path>
  </svg>
</li>`
}

  let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return city_name
  
 

  
  
} catch (err) {

  return err
 
}
}

navSearchButton.addEventListener('click', () =>{
 if (navSearchInput.value) {
  document.querySelector('.enter-city').style.display='none';
  document.querySelector('.valid-city').style.display='none';

  let city = navSearchInput.value
  getCurrentWeatherData(city)

  

 }
 
 
  
 
  
  
  

  
})

 const setWeatherData = (city)=>{
  console.log(city);
  
 } // datayı çek yerleştir
