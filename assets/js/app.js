const loading = document.querySelector('.loading')
const container = document.querySelector('.container')
const searchBtn = document.querySelector('.search-btn')
const searchCity = document.querySelector('.search-city')
const navSearch = document.querySelector('.nav-search')
const navSrcClose = document.querySelector('.nav-search-close')

const navSearchInput = document.querySelector('.nav-search-input')
const navSearchButton = document.querySelector('.nav-search-button')

// let units = 'metric'
// let apiKey = '00484987152255e2d06f78d9149a1649'
// Loading run
setTimeout(() => {
  loading.style.display = 'none'
  container.style.display = 'flex'
}, 1000)

searchBtn.addEventListener('click', () => {
  searchCity.style.display = 'none'
  navSearch.style.display = 'flex'
})
navSrcClose.addEventListener('click', () => {
  searchCity.style.display = 'block'
  navSearch.style.display = 'none'
})




document.querySelector('.celci').addEventListener('click', (e)=>{
 
  localStorage.setItem('typeCelc',true)

  e.target.classList.add('cel-fa-active')
  document.querySelector('.fahren').classList.remove('cel-fa-active')
})
document.querySelector('.fahren').addEventListener('click', (e)=>{
  localStorage.setItem('typeCelc',false)
    e.target.classList.add('cel-fa-active')
    document.querySelector('.celci').classList.remove('cel-fa-active')
  })

const getCurrentWeatherData = async (city) => {
  let lang = 'tr'

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=1723148a77444853837f03372fba544a&days=6`
  try {
    const response = await axios(url)

    const { data, country_code, city_name } = response.data

    if (typeof data == 'undefined') {
      document.querySelector('.valid-city').style.display = 'block'
      navSearchInput.value = ''
    } else {
      document.querySelector(
        '.nav-search-result-ul'
      ).innerHTML += `<li class="nav-search-result-li btnn" onclick= "setWeatherData()">
  <button class="nav-search-result-btn " ><span class="nav-search-result-spn">${city_name}</span>,<span> ${country_code}</span></button><svg
    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="icon" height="1em"
    width="1em" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z">
    </path>
  </svg>
</li>`
    }

    // let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return
  } catch (err) {
    console.log(err);
    
  }
}



navSearchButton.addEventListener('click', () => {
  if (navSearchInput.value) {
    let city = navSearchInput.value
    getCurrentWeatherData(city)
  }
})
// datayı çek yerleştir

const setWeatherData = async () => {


  
  const citY = document.querySelector('.nav-search-result-spn').textContent


  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${citY}&key=1723148a77444853837f03372fba544a&days=6`
  try {
    const response = await axios(url)
    const { data, country_code, city_name } = response.data
    
    
    document.querySelector('.nav-search-result-ul').innerHTML = ''
    navSearchInput.value = ''
    searchCity.style.display = 'block'
    navSearch.style.display = 'none'

    const { wind_cdir, temp, weather, datetime, valid_date } = data[0]
    // fahrenayt celcious
    


 


//     if (typeCelc) {
   
      
 document.querySelector('.degree-s span').innerText = String(temp ).split(
      '.'
    )[0]
//     }else {


//       document.querySelector('.celci-s').innerText = '°F'
//  document.querySelector('.degree-s span').innerText = String((temp * 1.8)+ 32.).split(
//       '.'
//     )[0]
//     }

    

    // weather icons
    let iconUrl

    switch (weather.code) {
      case 201:
      case 202:
      case 200:
      case 230:
      case 231:
      case 232:
      case 233:
        iconUrl = './assets/img/Thunderstorm.png'
        break
      case 300:
      case 301:
      case 302:
      case 511:
      case 611:
      case 612:
        iconUrl = './assets/img/Sleet.png'
        break
      case 500:
      case 501:
        iconUrl = './assets/img/LightRain.png'
        break
      case 502:
      case 522:
        iconUrl = './assets/img/HeavyRain.png'
        break
      case 601:
      case 621:
        iconUrl = './assets/img/Snow.png'
        break
      case 622:
      case 623:
        iconUrl = './assets/img/Hail.png'
        break
      case 521:
      case 520:
      case 522:
        iconUrl = './assets/img/Shower.png'
        break
      case 800:
        iconUrl = './assets/img/Clear.png'
        break
      case 801:
      case 802:
      case 700:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
        iconUrl = './assets/img/LightCloud.png'
        break
      case 803:
      case 804:
      case 900:
        iconUrl = './assets/img/HeavyCloud.png'
    }
    console.log(wind_cdir)

    // set data first page
    //celcious
   
    // weather desc
    document.querySelector('.w-desc').innerText = weather.description

    // img icon
    document.querySelector('.w-img').src = iconUrl
    // city name text
    document.querySelector('.city-name').innerText = city_name
    document.querySelector('.country-name').innerText = country_code

    // date
    const launchDate = new Date(data[0].datetime)
    const futureDate = new Date()
    futureDate.setTime(launchDate.getTime())
    const newDate = launchDate.toString().split(' ')
    console.log(launchDate.toString().split(' '))

    document.querySelector('.date-day').innerText = newDate[0]
    document.querySelector('.date-num').innerText = newDate[2]
    document.querySelector('.date-month').innerText = newDate[1];


// days

 // days img

 let iconUrl1;
 
 switch (data[1].weather.code) {
  case 201:
  case 202:
  case 200:
  case 230:
  case 231:
  case 232:
  case 233:
    iconUrl1 = './assets/img/Thunderstorm.png'
    break
  case 300:
  case 301:
  case 302:
  case 511:
  case 611:
  case 612:
    iconUrl1 = './assets/img/Sleet.png'
    break
  case 500:
  case 501:
    iconUrl1 = './assets/img/LightRain.png'
    break
  case 502:
  case 522:
    iconUrl1 = './assets/img/HeavyRain.png'
    break
  case 601:
  case 621:
    iconUrl1 = './assets/img/Snow.png'
    break
  case 622:
  case 623:
    iconUrl1 = './assets/img/Hail.png'
    break
  case 521:
  case 520:
  case 522:
    iconUrl1 = './assets/img/Shower.png'
    break
  case 800:
    iconUrl1= './assets/img/Clear.png'
    break
  case 801:
  case 802:
  case 700:
  case 711:
  case 721:
  case 731:
  case 741:
  case 751:
    iconUrl1 = './assets/img/LightCloud.png'
    break
  case 803:
  case 804:
  case 900:
    iconUrl1 = './assets/img/HeavyCloud.png'
}

let iconUrl2;
 
switch (data[2].weather.code) {
 case 201:
 case 202:
 case 200:
 case 230:
 case 231:
 case 232:
 case 233:
   iconUrl2 = './assets/img/Thunderstorm.png'
   break
 case 300:
 case 301:
 case 302:
 case 511:
 case 611:
 case 612:
   iconUrl2 = './assets/img/Sleet.png'
   break
 case 500:
 case 501:
   iconUrl2 = './assets/img/LightRain.png'
   break
 case 502:
 case 522:
   iconUrl2 = './assets/img/HeavyRain.png'
   break
 case 601:
 case 621:
   iconUrl2 = './assets/img/Snow.png'
   break
 case 622:
 case 623:
   iconUrl2 = './assets/img/Hail.png'
   break
 case 521:
 case 520:
 case 522:
   iconUrl2 = './assets/img/Shower.png'
   break
 case 800:
   iconUrl2= './assets/img/Clear.png'
   break
 case 801:
 case 802:
 case 700:
 case 711:
 case 721:
 case 731:
 case 741:
 case 751:
   iconUrl2 = './assets/img/LightCloud.png'
   break
 case 803:
 case 804:
 case 900:
   iconUrl2 = './assets/img/HeavyCloud.png'
}
let iconUrl3;
 
switch (data[3].weather.code) {
 case 201:
 case 202:
 case 200:
 case 230:
 case 231:
 case 232:
 case 233:
   iconUrl3 = './assets/img/Thunderstorm.png'
   break
 case 300:
 case 301:
 case 302:
 case 511:
 case 611:
 case 612:
   iconUrl3 = './assets/img/Sleet.png'
   break
 case 500:
 case 501:
   iconUrl3 = './assets/img/LightRain.png'
   break
 case 502:
 case 522:
   iconUrl3 = './assets/img/HeavyRain.png'
   break
 case 601:
 case 621:
   iconUrl3 = './assets/img/Snow.png'
   break
 case 622:
 case 623:
   iconUrl3 = './assets/img/Hail.png'
   break
 case 521:
 case 520:
 case 522:
   iconUrl3 = './assets/img/Shower.png'
   break
 case 800:
   iconUrl3= './assets/img/Clear.png'
   break
 case 801:
 case 802:
 case 700:
 case 711:
 case 721:
 case 731:
 case 741:
 case 751:
   iconUrl3 = './assets/img/LightCloud.png'
   break
 case 803:
 case 804:
 case 900:
   iconUrl3 = './assets/img/HeavyCloud.png'
}
let iconUrl4;
 
switch (data[4].weather.code) {
 case 201:
 case 202:
 case 200:
 case 230:
 case 231:
 case 232:
 case 233:
   iconUrl4 = './assets/img/Thunderstorm.png'
   break
 case 300:
 case 301:
 case 302:
 case 511:
 case 611:
 case 612:
   iconUrl4 = './assets/img/Sleet.png'
   break
 case 500:
 case 501:
   iconUrl4 = './assets/img/LightRain.png'
   break
 case 502:
 case 522:
   iconUrl4 = './assets/img/HeavyRain.png'
   break
 case 601:
 case 621:
   iconUrl4 = './assets/img/Snow.png'
   break
 case 622:
 case 623:
   iconUrl4 = './assets/img/Hail.png'
   break
 case 521:
 case 520:
 case 522:
   iconUrl4 = './assets/img/Shower.png'
   break
 case 800:
   iconUrl4= './assets/img/Clear.png'
   break
 case 801:
 case 802:
 case 700:
 case 711:
 case 721:
 case 731:
 case 741:
 case 751:
   iconUrl4 = './assets/img/LightCloud.png'
   break
 case 803:
 case 804:
 case 900:
   iconUrl4 = './assets/img/HeavyCloud.png'
}


 document.querySelector('.day1 img').src = iconUrl1 ;document.querySelector('.day2 img').src = iconUrl2 ;document.querySelector('.day3 img').src = iconUrl3 ;document.querySelector('.day4 img').src = iconUrl4;


// days datetime

    const launchDate2 = new Date(data[2].datetime)
    const futureDate2 = new Date()
    futureDate2.setTime(launchDate2.getTime())
    const newDate2 = launchDate2.toString().split(' ')

    document.querySelector('.day2 .day-desc').innerHTML =
    `
    ${newDate2[0]}, ${newDate2[2]} ${newDate2[1]}
    ` ;

    const launchDate3 = new Date(data[3].datetime)
    const futureDate3 = new Date()
    futureDate3.setTime(launchDate3.getTime())
    const newDate3 = launchDate3.toString().split(' ')

    document.querySelector('.day3 .day-desc').innerHTML =
    `
    ${newDate3[0]}, ${newDate3[2]} ${newDate3[1]}
    ` ;

    const launchDate4 = new Date(data[4].datetime)
    const futureDate4 = new Date()
    futureDate4.setTime(launchDate4.getTime())
    const newDate4 = launchDate4.toString().split(' ')

    document.querySelector('.day4 .day-desc').innerHTML =
    `
    ${newDate4[0]}, ${newDate4[2]} ${newDate4[1]}
    ` ;

    const launchDate5 = new Date(data[5].datetime)
    const futureDate5 = new Date()
    futureDate5.setTime(launchDate5.getTime())
    const newDate5 = launchDate5.toString().split(' ')

    document.querySelector('.day5 .day-desc').innerHTML =
    `
    ${newDate5[0]}, ${newDate5[2]} ${newDate5[1]}
    ` ;


    // day max min
    console.log(data);
    

    document.querySelector('.day1 .celc-max').innerText = data[0].max_temp
    
    document.querySelector('.day1 .celc-min').innerText = data[0].min_temp
    
    document.querySelector('.day2 .celc-max').innerText = data[1].max_temp
    
    document.querySelector('.day2 .celc-min').innerText = data[1].min_temp
    
    document.querySelector('.day3 .celc-max').innerText = data[2].max_temp
    
    document.querySelector('.day3 .celc-min').innerText = data[2].min_temp
    
    document.querySelector('.day4 .celc-max').innerText = data[3].max_temp
    
    document.querySelector('.day4 .celc-min').innerText = data[3].min_temp

    document.querySelector('.day5 .celc-max').innerText = data[4].max_temp
    
    document.querySelector('.day5 .celc-min').innerText = data[4].min_temp

















  } catch (err) {
    document.querySelector('.enter-city').style.display = 'block'
    document.querySelector('.enter-city').innerText = `${err.message}`
    setTimeout(() => {
      navSearchInput.value = ''
      document.querySelector('.enter-city').style.display = 'none'
    }, 5000)

}
}
