
//let cartstoragesaved = (JSON.parse(localStorage.getItem(`"user_cart"${usuario_name}`))) || []
let containerInicio = document.getElementById('containerInicio')


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
console.log(cartstoragesaved.length)
function bienvenida(){
if(cartstoragesaved.length ===0){
containerInicio.innerHTML= `
<div class="card text-center bg-dark bg-gradient"  style="color: orange" >
  <div class="card-header">
  <strong>Hola ${usuario_name} !</strong>
  </div>
  <div class="card-body  ">
    <h5 class="card-title"></h5>
    <p class="card-text"><strong>Recuerda que puedes actualizar tus datos, ver tu carrito de compras o cambiar tu imagen de usuario.</strong></p>
    
  <button class="btn btn-secondary " type="button"  aria-expanded="false"><a class="dropdown-item" href="my-profile.html">
  <strong style="color:orange"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff9300" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="7" r="4" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>  ${usuario_name}</strong></a>
  </button>
  <button class="btn btn-secondary " type="button"  aria-expanded="false"><a class="dropdown-item" href="my-profile.html">
  <strong style="color:orange"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff9300" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="7" r="4" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>  ${usuario_name}</strong></a>
  </button>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
  </div>

`} else {
    console.log("nojkhsdajk")
}
}

bienvenida()