const Productos_info_div = document.getElementById("Productos_info_div")
const Productos_info_div_2 = document.getElementById("Productos_info_div_2")

function HtmlProductosInfo(productos_info) {
    Productos_info_div.innerHTML +=`<div  class="list-group-item list-group-item-action">
    <div class="row">
        <div class="d-flex mb-1 col-xs-2 col-sm-5 col-md-4 col-lg-3 justify-content-between ">
        <img src="${productos_info.images[0]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
        <img src="${productos_info.images[1]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
        <img src="${productos_info.images[2]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
        <img src="${productos_info.images[3]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">

        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${productos_info.name} - ${productos_info.currency} ${productos_info.cost} </h4> 
                <p>${productos_info.description} </p> 
                </div>
                <small class="text-muted">${productos_info.soldCount} vendidos</small> 
            </div>
            </div>
        
    </div>
</div>
`
}


function HtmlProductosComments(productos_comments) {
    /*Productos_info_div.innerHTML +=*/ return   `<div  class="list-group-item list-group-item-action">
    <div class="row">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${productos_comments.user} - ${productos_comments.user} ${productos_comments.dateTime} </h4> 
                <p>${productos_comments.description} </p> 
                </div>
                <small class="text-muted">${productos_comments.score} puntuacion</small> 
            </div>
            </div>
        
    </div>
</div>
`

}
function showHtmlComments(){
    for(let i = 0; i < productos_comments.length; i++){
        let comments = productos_comments[i]    
        Productos_info_div.innerHTML += HtmlProductosComments(comments);
    }      
}

function showProduct(){
    for(let i = 0; i < productos_info.length; i++){
        let product_content = productos_info[i]    
        Productos_info_div_2.innerHTML += HtmlProductosInfo(product_content);
    }      
}


    document.addEventListener("DOMContentLoaded", async function() {
   
 
        getJSONData(PRODUCT_INFO_URL) .then(function(respuesta){
        if(respuesta.status === "ok"){
            productos_info = respuesta.data
            console.log(productos_info)
            console.log(productos_info.images)
            HtmlProductosInfo(productos_info)
        }})
        
        getJSONData(PRODUCT_INFO_COMMENTS_URL) .then(function(respuesta){
            if(respuesta.status === "ok"){
                productos_comments = respuesta.data
                console.log(productos_comments)
                showHtmlComments()  
        }})
            
     
    })

