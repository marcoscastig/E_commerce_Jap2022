const Formulario = document.getElementById("Formulariologin")

Formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(Formulario);
  let usuario = data.get('email')

  let password = data.get('pass')
  
  if (password == "" || usuario == "") {
    alert('Usuario o contraseña incorrecto!!!');
  } else {
    window.location.replace("inicio.html")
  }
})
