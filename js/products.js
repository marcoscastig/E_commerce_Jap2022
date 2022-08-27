const url = PRODUCTS_URL
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_SOLD = "Cant.";
let productos = [];
let currentSortCriteriaProducts = undefined;
let minCount = undefined;
let maxCount = undefined;
const Lista = document.getElementById("cat-list-container")

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

function showCategoriesListProducts(){
let htmlContentToAppend = "";
for(let i = 0; i < productos.products.length; i++){
    let products = productos.products[i];
    
    if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
    ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){    
    htmlContentToAppend += `<div class="list-group-item list-group-item-action">
     <div class="row">
         <div class="col-3">
         <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
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
 `}
 Lista.innerHTML = htmlContentToAppend;
}
}

function sortAndShowCategoriesProducts(sortCriteria, categoriesArray){
    currentSortCriteriaProducts = sortCriteria;

    if(categoriesArray != undefined){
        productos = categoriesArray;
    }

    sortCategoriesProducts(currentSortCriteriaProducts, productos.products);

    //Muestro las categorías ordenadas
    showCategoriesListProducts();
}



 document.addEventListener("DOMContentLoaded", async function() {
       
    getJSONData(url) .then(function(respuesta){
    if(respuesta.status === "ok"){
        productos = respuesta.data
        showCategoriesListProducts()
        
    }  
    })
 

 document.getElementById("sortAsc1").addEventListener("click", function(){
    sortAndShowCategoriesProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc1").addEventListener("click", function(){
    sortAndShowCategoriesProducts(ORDER_DESC_BY_COST);
});

document.getElementById("sortByCount1").addEventListener("click", function(){
    sortAndShowCategoriesProducts(ORDER_BY_PROD_SOLD);
});

document.getElementById("clearRangeFilter1").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMinProduct1").value = "";
    document.getElementById("rangeFilterCountMaxProduct1").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesListProducts();
});

document.getElementById("rangeFilterCount1").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMinProduct1").value;
    maxCount = document.getElementById("rangeFilterCountMaxProduct1").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showCategoriesListProducts();
});
})
