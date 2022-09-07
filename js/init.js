const CATID = localStorage.getItem("catID")
const PRODID = localStorage.getItem("productID")
const EXT_TYPE = ".json";
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/${CATID}${EXT_TYPE}`; 
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${PRODID}${EXT_TYPE}`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${PRODID}${EXT_TYPE}`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const navbariul = document.querySelector('ul') 
const usuario_name = localStorage.getItem("usuario") 
const Footer = document.querySelector('footer')


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
            <a class="nav-link active" href="categories.html">Categorías</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html">Vender</a>
          </li>
         <li class="nav-item">
          <a class="nav-link" href="my-profile.html">${usuario_name}</a>
   </li>`
}

  let ShowUser = function(){ 
    navbariul.insertAdjacentHTML("beforeend",agregarusuario(usuario_name)) 
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