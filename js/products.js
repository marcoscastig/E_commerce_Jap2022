const ORDER_ASC_BY_COST = "12";
const ORDER_DESC_BY_COST = "21";
const ORDER_BY_PROD_SOLD = "Sold";
let productos = [];
let currentSortCriteriaProducts = undefined;
let minSold = undefined;
let maxSold = undefined;
const Lista = document.getElementById("cat-list-container")
const sector_buscador =document.getElementById("sector_buscador")




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

function setIDProd(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function HtmlProductos(products) {
    return `<div onclick="setIDProd(${products.id})" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
        <img src="${products.image}" alt="${products.description}" class="img-fluid img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${products.name} - ${products.currency} ${products.cost} </h4> 
                <p>${products.description} </p> 
                </div>
                <small class="text-muted">${products.soldCount} vendidos</small> 
            </div>
            </div>
        
    </div>
</div>
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
   
 
    getJSONData(PRODUCTS_URL) .then(function(respuesta){
    if(respuesta.status === "ok"){
        productos = respuesta.data
        showCategoriesListProducts()
        
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

})

const buscador = document.getElementById("buscador_id")
const buscar_producto = ()=> {
    const Busca = new FormData(buscador)
    let busqueda= Busca.get('busqueda').toLowerCase()
    Lista.innerHTML =""
    for(let i = 0; i < productos.products.length; i++){
        let productos_txt = productos.products[i].name.toLowerCase();
        let products = productos.products[i]
        if(productos_txt.indexOf(busqueda) !== -1){
           
            Lista.innerHTML += HtmlProductos(products)
        }
    }
    if(Lista.innerHTML === ""){
        Lista.innerHTML = "No Hay resultados"
    }
    else {

    }
}

buscador.addEventListener('submit', (event) => {
event.preventDefault();
buscar_producto()

})
buscador.addEventListener('keyup', (event) => {
    event.preventDefault();
    buscar_producto()
    
})
