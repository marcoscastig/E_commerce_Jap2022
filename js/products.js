const ORDER_ASC_BY_COST = "12";
const ORDER_DESC_BY_COST = "21";
const ORDER_BY_PROD_SOLD = "Sold";
let productos = [];
let currentSortCriteriaProducts = undefined;
let minSold = undefined;
let maxSold = undefined;
const Lista = document.getElementById("cat-list-container")
const sector_buscador =document.getElementById("sector_buscador")
const Lista1 = document.getElementById("Lista1")


let agregarbarra = function(){
    return `<div class="container-fluid ">
    <form id="buscador_id" class="d-flex mb-4" role="search">
      <input class="form-control me-2"  placeholder="Search" name="busqueda" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>`
  }
  let barra_busqueda = function(){ 
    sector_buscador.insertAdjacentHTML("afterbegin",agregarbarra()) 
  }
  barra_busqueda()

function sortCategoriesProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function HtmlProductos(products) {
    return `<a  href="product-info.html">
    <div onclick="setIDProd(${products.id})" class="list-group-item list-group-item-action">
    <div class="row ">
    <div class="col-xs-2 col-sm-5 col-md-4 col-lg-3 ">
    <img src="${products.image}" alt="${products.description}" class="img-fluid img-thumbnail">
    </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <div class="mb-1">
    <h4>${products.name} - ${products.currency} ${products.cost} </h4> 
    <p>${products.description} </p> 
    </div>
    <small class="text-muted"><strong style="color: green">${products.soldCount} vendidos</strong></small> 
    </div>
    <div id="${products.id}"> </div>
    </div>
    </div>
    </div>
    </a>
`
}


function showCategoriesListProducts(){
let htmlContentToAppend = "";
for(let i = 0; i < productos.products.length; i++){
  
    let products = productos.products[i];
    
    if (((minSold == undefined) || (minSold != undefined && parseInt(products.cost) >= minSold)) &&
    ((maxSold == undefined) || (maxSold != undefined && parseInt(products.cost) <= maxSold))){    
    htmlContentToAppend += HtmlProductos(products)}
 Lista.innerHTML = htmlContentToAppend;
}
}

function sortAndShowCategoriesProducts(sortCriteria, categoriesArray){
    currentSortCriteriaProducts = sortCriteria;

    if(categoriesArray != undefined){
        productos = categoriesArray;
    }

    sortCategoriesProducts(currentSortCriteriaProducts, productos.products);

    
    showCategoriesListProducts();
}



 document.addEventListener("DOMContentLoaded", async function() {
    const buscador = document.getElementById("buscador_id")
 
    getJSONData(PRODUCTS_URL) .then(function(respuesta){
    if(respuesta.status === "ok"){
        productos = respuesta.data
        showCategoriesListProducts()
        console.log(productos)

        for(let i = 0; i < productos.products.length; i++){
            elemento = (productos.products[i].id)
            traerPuntuacion(elemento)
        }
    }  
    
    })
 

 document.getElementById("sortAscProd").addEventListener("click", function(){
    sortAndShowCategoriesProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDescProd").addEventListener("click", function(){
    sortAndShowCategoriesProducts(ORDER_DESC_BY_COST);
});

document.getElementById("sortByCountProd").addEventListener("click", function(){
    sortAndShowCategoriesProducts(ORDER_BY_PROD_SOLD);
});

document.getElementById("clearRangeFilterCost").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMinProduct").value = "";
    document.getElementById("rangeFilterCostMaxProduct").value = "";

    minSold = undefined;
    maxSold = undefined;

    showCategoriesListProducts();
});

document.getElementById("rangeFilterCost").addEventListener("click", function(){
 
    minSold = document.getElementById("rangeFilterCostMinProduct").value;
    maxSold = document.getElementById("rangeFilterCostMaxProduct").value;

    if ((minSold != undefined) && (minSold != "") && (parseInt(minSold)) >= 0){
        minSold = parseInt(minSold);
    }
    else{
        minSold = undefined;
    }

    if ((maxSold != undefined) && (maxSold != "") && (parseInt(maxSold)) >= 0){
        maxSold = parseInt(maxSold);
    }
    else{
        maxSold = undefined;
    }

    showCategoriesListProducts();
});


//buscador
const buscar_producto = ()=> {
    const Busca = new FormData(buscador)
    let busqueda= Busca.get('busqueda').toLowerCase()
    Lista.innerHTML =""
    for(let i = 0; i < productos.products.length; i++){
        let products = productos.products[i]
        let productos_txt = products.name.toLowerCase();
        let productos_desc = products.description.toLowerCase()
        if((productos_txt.indexOf(busqueda) !== -1 )|| (productos_desc.indexOf(busqueda)!== -1)){
           
            Lista.innerHTML += HtmlProductos(products)
        }
    }
    if(Lista.innerHTML === ""){
        Lista.innerHTML += `<div class="mb-1">
        <h4 style="color:orange">Sigue navegando, tenemos grandes productos para ti</h4> 
        </div>`
    }
    
}

buscador.addEventListener('submit', (event) => {
    event.preventDefault();
    buscar_producto()
    buscador.reset()
    
    })
    buscador.addEventListener('keyup', (event) => {
        event.preventDefault();
       
        buscar_producto()
        
    })
    

})


 function traerPuntuacion(identificador) {
   
    
getJSONData(`https://japceibal.github.io/emercado-api/products_comments/${identificador}${EXT_TYPE}`).then(function (respuesta) {
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

    document.getElementById(`${identificador}`).innerHTML = `<p>${((promedio/(largoComments+1)).toFixed(2))} </p>`
    
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

 let textoplano = promedio 

 let promedioFinal = ((textoplano+promedioLocalStorage)/((largoCommentsLocalStorage+1)+(largoComments+1))).toFixed(2)

 document.getElementById(`${identificador}`).innerHTML = `<p>${(promedioFinal)} </p>
`
}
    
  }
  })
}

 


