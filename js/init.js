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
let cartstoragesaved = (JSON.parse(localStorage.getItem(`"user_cart"${usuario_name}`))) || []

let ColorFooter = function(Footer){
  Footer.classList.remove('text-muted')
  Footer.classList.add('text-dark','bg-white')
}



//agrega en el navar al usuario logeado
let agregarusuario = function(usuario_name){
    return `
    <li class="nav-item">
            <a class="nav-link" href="inicio.html"><strong>Inicio</strong></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="categories.html"><strong>Categorías</strong></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html"><strong>Vender</strong></a>
          </li>
   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <strong style="color:orange">${usuario_name}</strong>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="6" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M17 17h-11v-14h-2" />
    <path d="M6 5l14 1l-1 7h-13" />
  </svg> <strong>Mi carrito</strong> </a></li>
    <li><a class="dropdown-item" href="my-profile.html"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
  </svg> <strong>Mi perfil</strong></a> </li>
    <li><a onclick="resetusuario(id)" class="dropdown-item" href="index.html"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <path d="M7 12h14l-3 -3m0 6l3 -3" />
  </svg><strong>Cerrar sesión</strong></a></li>
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

function soloLetras(e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
    especiales = [8, 37, 39, 46],
    tecla_especial = false;

  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}

function siempreHayQueLogearse () {
  if((usuario_name ===null) || (usuario_name === "")){
    window.location.replace("index.html")
  }
}

siempreHayQueLogearse()

function traerPuntuacion(identificador) {
   let selector = document.getElementById(`${identificador}`)
   
    
  getJSONData(`https://japceibal.github.io/emercado-api/products_comments/${identificador}${EXT_TYPE}`).then(function (respuesta) {
   
    selector = document.getElementById(`${identificador}`)
      let puntuacion = 0
      let largoComments = 0
      if (respuesta.status === "ok") {
          
        productos_comments = respuesta.data
    
  
      for (let e = 0; e < productos_comments.length; e++) {
          let element = productos_comments[e].score; 
          largoComments = e
          
          puntuacion += element
      }
      let promedio = puntuacion
      if(promedio===0){
          selector.innerHTML = ""
      }
      else{
  
          selector.innerHTML = `<p><i>Puntuacion promedio ${(promedio/(largoComments+1)).toFixed(1)}  <strong>${htmlProgress((promedio/(largoComments+1)).toFixed(1))}</strong></i> </p>`
      }
      
     let puntuacionLocalStorage = 0
  
     let largoCommentsLocalStorage = 0
  
     const myObjarraycomment = JSON.parse(localStorage.getItem(`"comments_user"${identificador}`)) || [];
  
     if(myObjarraycomment.length != 0){
   
     for (let e = 0; e < myObjarraycomment.length; e++) {
   
     let element = myObjarraycomment[e].score;
     
        largoCommentsLocalStorage = e
     
        puntuacionLocalStorage += element
    
  }
  
   let promedioLocalStorage = puntuacionLocalStorage
   
   let promedioFinal = ((promedio+promedioLocalStorage)/((largoCommentsLocalStorage+1)+(largoComments+1))).toFixed(1)
  
   if(promedio===0){
     
      promedioFinal= (promedioLocalStorage/(largoCommentsLocalStorage+1))
     
      selector.innerHTML = `<p><i>Puntuacion promedio ${promedioFinal.toFixed(1)}   <strong>${htmlProgress(promedioFinal)}</strong></i> </p>
  `
   } 
   else {
      selector.innerHTML =`<p><i>Puntuacion promedio ${promedioFinal}<strong>${htmlProgress(promedioFinal)}</strong></i> </p>
      `
      return
   }
  
  }   
    }
    })
  }


  function htmlProgress (x){
      return `
      <progress value="${x}" max="5"></progress>
      
      `
  }
  