const loading = document.querySelector('.loading');
const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-btn')
const searchCity = document.querySelector('.search-city');
const navSearch = document.querySelector('.nav-search');
const navSrcClose = document.querySelector('.nav-search-close')


// Loading run
setTimeout(() => {
  loading.style.display = 'none';
  container.style.display = 'block';
}, 1000);

searchBtn.addEventListener('click',()=> {
  console.log("click");
  
  searchCity.style.display = 'none'
  navSearch.style.display = 'flex'
})
navSrcClose.addEventListener('click',()=>{
  searchCity.style.display = 'block'
  navSearch.style.display = 'none'
})





const getWeatherDataFromApi = async () => {
let apiKey = "00484987152255e2d06f78d9149a1649";
let units = "metric";
let lang = "tr";
let city = "ankara"
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
try {
  const response = await axios(url)
  const {id,main,name,sys,weather} = response.data
  let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  console.log(response.data);
  
 

  
  
} catch (err) {

  
  console.log(err)
}
}
getWeatherDataFromApi()


