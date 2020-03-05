var BASE_URL = 'http://localhost:3000';
var TOKEN = localStorage.getItem('token');

//CEK TOKEN
// if (TOKEN) {
  $('#nav').show();
  $('#home').show();
  $('#login-bg').hide();
//   $('#login-bg').hide();
//   getAllTodos()
// } else {
//   $('#nav').hide();
//   $('#home').hide();
//   $('#login').show();
//   $('#register').hide();
// }
  $('#home').hide();
  $('#login').hide();
  $('#register').hide();

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
  const username = $('#usernameRegister').val();
  const email = $('#emailRegister').val();
  const password = $('#passwordRegister').val();
  $.ajax({
      type: "POST",
      url: BASE_URL + "user/register",
      data: {
        username,
        email,
        password
      },
    })
    .done(data => {
      Swal.fire({
        title: 'Succes!',
        text: `Congratulation youre account has been create, Please Login`,
        icon: 'success',
        confirmButtonText: 'Ok'
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
// END REGISTER

// LOGIN
$('#formLogin').submit(function (e) {
  e.preventDefault();
  const email = $('#emailLogin').val();
  const password = $('#passwordLogin').val();
  $.ajax({
      type: "POST",
      url: BASE_URL + "user/login",
      data: {
        email,
        password
      },
    })
    .done(data => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.name)
      TOKEN = localStorage.getItem('token')
      getName()
      getAllTodos()
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
});
// END LOGIN