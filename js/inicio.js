
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
<div class="card text-center">
  <div class="card-header">
  Bienvenid@  ${usuario_name}
  </div>
  <div class="card-body">
    <h5 class="card-title"></h5>
    <p class="card-text">Recuerda que puedes ir a categorias y agregar al carrito.</p>
    <a href="categories.html" class="btn btn-primary"><strong>Categorias</strong></a>
  </div>
  
</div>

`} else {
  containerInicio.innerHTML= `
  <div class="card text-center">
    <div class="card-header">
     Hola de nuevo! ${usuario_name}
    </div>
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text">Personaliza tu carrito y finaliza tu compra.</p>
      <a href="cart.html" class="btn btn-primary"><strong>Carrito</strong></a>
    </div>
  </div>
  
  `
}
}

bienvenida()