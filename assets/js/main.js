var BASE_URL = 'http://localhost:3000';
var TOKEN = localStorage.getItem('token');

// ERROR HANDLER 
var errorMsg = (err) => {
  console.log(err)
  if (Array.isArray(err.responseJSON.message)) {
    let errorMessage = ''
    err.responseJSON.message.forEach(element => {
      errorMessage += element + '<br>'
    });
    return errorMessage
  } else {
    return err.responseJSON.message
  }
} 
//CEK TOKEN
if (TOKEN) {
  $('#nav').show();
  $('#home').show();
  $('#login-bg').hide();
  $('#login').hide();
  $('#register').hide();
} else {
  $('#nav').hide();
  $('#home').hide();
  $('#login-bg').show();
  $('#login').show();
  $('#register').hide();
}

//BTN LOGIN REGISTER
$('#btn-login').click(function (e) {
  e.preventDefault();
  $('#login').show();
  $('#register').hide();
});
$('#btn-register').click(function (e) {
  e.preventDefault();
  $('#register').show();
  $('#login').hide();
});

// REGISTER
$('#formRegister').submit(function (e) {
  e.preventDefault();
  const name = $('#usernameRegister').val();
  const email = $('#emailRegister').val();
  const password = $('#passwordRegister').val();
  $.ajax({
      type: "POST",
      url: BASE_URL + "/user/register",
      data: {
        name,
        email,
        password
      },
    })
    .done(data => {
      localStorage.setItem('token', data.token)
      TOKEN = localStorage.getItem('token')
      $('#nav').show();
      $('#home').show();
      $('#login-bg').hide();
      $('#login').hide();
      $('#register').hide();
      Swal.fire({
        title: 'Succes!',
        text: `Congratulation youre account has been create, Please Login`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    })
    .fail(err => {
      console.log(err.responseJSON)
      Swal.fire({
        title: 'Error!',
        html: `${errorMsg(err)}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
});
// END REGISTER

// LOGIN
$('#formLogin').submit(function (e) {
  e.preventDefault();
  const email = $('#emailLogin').val();
  const password = $('#passwordLogin').val();
  $.ajax({
      type: "POST",
      url: BASE_URL + "/user/login",
      data: {
        email,
        password
      },
    })
    .done(data => {
      localStorage.setItem('token', data.token)
      TOKEN = localStorage.getItem('token')
      $('#nav').show();
      $('#home').show();
      $('#login-bg').hide();
      $('#login').hide();
      $('#register').hide();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    })
    .fail(err => {
      Swal.fire({
        title: 'Error!',
        html: `${errorMsg(err)}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
});
// END LOGIN


// LOGIN GOOGLE
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: "POST",
    url: BASE_URL + "/user/registerGoogle",
    data: { id_token },
  })
    .done(data => {
      localStorage.setItem('token', data.token)
      TOKEN = localStorage.getItem('token')
      $('#nav').show();
      $('#home').show();
      $('#login').hide();
      $('#register').hide();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
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

// END LOGIN GOOGLE

// LOGOUT
$('#logout').click(function (e) {
  e.preventDefault();
  localStorage.removeItem('token')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('#home').hide();
  $('#nav').hide();
  $('#login-bg').show();
  $('#login').show();
  $('#register').hide();
});
// END LOGOUT