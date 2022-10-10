const CATID = localStorage.getItem("catID")
const PRODID = localStorage.getItem("productID")
const CARTDEFAULT = "25801"
const EXT_TYPE = ".json";
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${CATID}${EXT_TYPE}`; 
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${PRODID}${EXT_TYPE}`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PRODID}${EXT_TYPE}`;
const CART_INFO_URL = `https://japceibal.github.io/emercado-api/user_cart/${CARTDEFAULT}${EXT_TYPE}`;
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const navbariul = document.querySelector('ul') 
const usuario_name = localStorage.getItem("usuario") 
const Footer = document.querySelector('footer')
const cartstoragesaved = (JSON.parse(localStorage.getItem(`"user_cart"${usuario_name}`))) || []

let ColorFooter = function(Footer){
  Footer.classList.remove('text-muted')
  Footer.classList.add('text-dark','bg-white')
}

let agregarusuario = function(usuario_name){
    return `
    <li class="nav-item">
            <a class="nav-link" href="inicio.html">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="categories.html">Categorías</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html">Vender</a>
          </li>
   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${usuario_name}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a onclick="resetusuario(id)" class="dropdown-item" href="index.html">Cerrar sesión</a></li>
  </ul>
</div>`
}

  let ShowUser = function(){ 
    navbariul.insertAdjacentHTML("beforeend",agregarusuario(usuario_name)) 
  }
  function tipo_de_puntuacion(score) {
    if (score === 5) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>
      `
    } if (score === 4) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>
      `
    }
    if (score === 3) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>
      `
    }
    if (score === 2) {
      return ` <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span> 
      `
    }
    if (score === 1) {
      return `<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>
      `
    }
  }


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded",function(){ 
  ShowUser(usuario_name)
  ColorFooter(Footer)
})

function setIDProd(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}
function resetusuario() {
  localStorage.setItem("usuario", "");
  window.location = "index.html"
}
function convertDateFormat(string) {
  var info = string.split('/');
  return info[2] + '-' + info[1] + '-' + info[0];
}
