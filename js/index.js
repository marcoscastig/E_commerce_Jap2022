const Formulario = document.getElementById("Formulariologin")

Formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(Formulario);
  let usuario = data.get('email')

  let password = data.get('pass')

  localStorage.setItem("usuario",usuario)
  
  if (password == "" || usuario == "") {
    alert('Ingresa cualquier dato para ver el sitio!!!');
  } else {
    window.location.replace("inicio.html")
  }
})
