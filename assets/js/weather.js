$(document).ready(function () {
  geojs()

  function geojs() {
    $.ajax({
      method: 'get',
      url: 'https://get.geojs.io/v1/ip/geo.json',
      success: (data) => {
        console.log(data)
        darksky(data.latitude, data.longitude)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  function darksky(lat, long) {
    $.ajax({
      method: 'post',
      url: 'http://localhost:3000/weather',
      data: {
        lat,
        long
      },
      success: (data) => {
        console.log(data)
        login(data.timezone, data.latitude, data.longitude, data.currently.summary, data.currently.temperature)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  function login(city, lat, long, weather, temperature) {
    $.ajax({
      method: 'post',
      url: 'http://localhost:3000/history',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        city,
        lat,
        long,
        weather,
        temperature
      },
      success: (result) => {
        console.log('sukses')
        console.log(result)
      },
      error: (err) => {
        console.log('error')
      }
    })
  }


  // function darksky(lat, long){
  //   $.ajax({
  //     method: 'get',
  //     // headers:{
  //     //   'Access-Control-Allow-Origin': "*"
  //     // },
  //     url: `https://api.darksky.net/forecast/2af0bfcce00d2d8e71f7a205e4476659/${lat},${long}`,
  //     success: (data) => {
  //       console.log(data)
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }

})