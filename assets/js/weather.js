$(document).ready(function () {
  geojs()
  getDarksky()

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
        console.log(data.hourly.data)
        login(data.timezone, data.latitude, data.longitude, data.currently.summary, data.currently.temperature)
        let weather = ''
        if (data.currently.summary.toLowerCase().includes('humid')) {
          $('#currentweather').html(`
            <div class="breezy div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <span class="cloudr"></span>
            </div>
                <div class="d-flex flex-column px-5">
              <div>Time Zone : ${data.timezone}</div>
              <div>Summary : ${data.currently.summary}</div>
              <div>Temperatures : ${data.currently.apparentTemperature}F</div>
              <div>Humidity : ${data.currently.humidity}</div>
              <div>pressure : ${data.currently.pressure}</div>
              <div>Wind Speed : ${data.currently.windSpeed}</div>
            </div>
          `)
        } else if (data.currently.summary.toLowerCase().includes('rain')) {
          $('#currentweather').html(`
            <div class="stormy div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <span class="snowe"></span>
              <span class="snowex"></span>
              <span class="stick"></span>
              <span class="stick2"></span>
            </div>
                <div class="d-flex flex-column px-5">
              <div>Time Zone : ${data.timezone}</div>
              <div>Summary : ${data.currently.summary}</div>
              <div>Temperatures : ${data.currently.apparentTemperature}F</div>
              <div>Humidity : ${data.currently.humidity}</div>
              <div>pressure : ${data.currently.pressure}</div>
              <div>Wind Speed : ${data.currently.windSpeed}</div>
            </div>
          `)
        } else if (data.currently.summary.toLowerCase().includes('night')) {
          $('#currentweather').html(`
            <div class="night div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
        <span class="moon"></span>
        <span class="spot1"></span>
        <span class="spot2"></span>
            </div>
                <div class="d-flex flex-column px-5">
              <div>Time Zone : ${data.timezone}</div>
              <div>Summary : ${data.currently.summary}</div>
              <div>Temperatures : ${data.currently.apparentTemperature}F</div>
              <div>Humidity : ${data.currently.humidity}</div>
              <div>pressure : ${data.currently.pressure}</div>
              <div>Wind Speed : ${data.currently.windSpeed}</div>
            </div>
          `)
        } else if (data.currently.summary.toLowerCase().includes('cloud')) {
          $('#currentweather').html(`
            <div class="cloudy div-weather">
                  <span class="cloud"></span>
                  <span class="cloudx"></span>
            </div>
                <div class="d-flex flex-column px-5">
              <div>Time Zone : ${data.timezone}</div>
              <div>Summary : ${data.currently.summary}</div>
              <div>Temperatures : ${data.currently.apparentTemperature}F</div>
              <div>Humidity : ${data.currently.humidity}</div>
              <div>pressure : ${data.currently.pressure}</div>
              <div>Wind Speed : ${data.currently.windSpeed}</div>
            </div>
          `)
        } else {
          $('#currentweather').html(`
            <div>
              <div class="hot div-weather ml-0">
                <span class="sun"></span>
                <span class="sunx"></span>
              </div>
            </div>
            <div class="d-flex flex-column px-5">
              <div>Time Zone : ${data.timezone}</div>
              <div>Summary : ${data.currently.summary}</div>
              <div>Temperatures : ${data.currently.apparentTemperature}F</div>
              <div>Humidity : ${data.currently.humidity}</div>
              <div>pressure : ${data.currently.pressure}</div>
              <div>Wind Speed : ${data.currently.windSpeed}</div>
            </div>
          `)
        }
        $('#currentweatherhour').empty()
        data.hourly.data.forEach(el => {
          if (el.summary.toLowerCase().includes('humid')) {
            $('#currentweatherhour').append(`
            <div class="breezy div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <span class="cloudr"></span>
            </div>
                
          `)
          } else if (el.summary.toLowerCase().includes('rain')) {
            $('#currentweatherhour').append(`
            <div class="stormy div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <span class="snowe"></span>
              <span class="snowex"></span>
              <span class="stick"></span>
              <span class="stick2"></span>
            </div>
              
            </div>
          `)
          } else if (el.summary.toLowerCase().includes('night')) {
            $('#currentweatherhour').append(`
            <div class="night div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
        <span class="moon"></span>
        <span class="spot1"></span>
        <span class="spot2"></span>
            </div>
             
            </div>
          `)
          } else if (el.summary.toLowerCase().includes('cloud')) {
            $('#currentweatherhour').append(`
            <div class="cloudy div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            <span class="cloud"></span>
            <span class="cloudx"></span>
            </div>
               
            </div>
          `)
          } else {
            $('#currentweatherhour').append(`
            <div class="hot div-weather">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
        <span class="sun"></span>
        <span class="sunx"></span>
            </div>
               
            </div>
          `)
          }
        });
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
        // console.log(result)
      },
      error: (err) => {
        console.log('error')
      }
    })
  }
})
function getDarksky(lat, long) {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/history',
    headers: {
      token: localStorage.getItem('token')
    },
    success: (data) => {
      console.log(data)
      data.forEach((el, idx) => {
        $('#history').append(`
        <tr>
          <th scope="row">${idx+1}</th>
          <td>${el.city}</td>
          <td>${getDateFormat(new Date(el.date))}</td>
          <td>${el.weather}</td>
          <td>${el.temperature}</td>
          <td><a href="#" onClick="deleteHistory(${el.id})" class="btn btn-primary btn-sm">Delete</a></td>
        </tr>

        `);
      });
    },
    error: (err) => {
      console.log(err)
    }
  })
}

function deleteHistory(id) {
  console.log(id)
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
              $.ajax({
              method: 'delete',
              url: 'http://localhost:3000/history/'+id,
              headers: {
                token: localStorage.getItem('token')
                },
              })
                .done(data => {
                getDarksky()
                  Swal.fire(
                    'Deleted!',
                    `Your todos ${data.title} has been deleted.`,
                    'success'
                  )
                })
              .fail(err => {
                Swal.fire({
                  title: 'Error!',
                  html: `${errorMsg(err)}`,
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
              })
            }
      })
}
function getDateFormat(date) {
  console.log(date)
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
  // let date = new Date()
  let dayName = days[date.getDay()]
  let dateFormat =
    `${dayName}, ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} |
    ${date.getHours()}:${date.getMinutes()}`
  return dateFormat
}