fetch(PRODUCTS_URL)
.then(response => response.json())
.then(data => showdata(data))
.catch(error => console.log(error))
const showdata = (data) => {
    let htmlContentToAppend =""
    
    for(let i = 0; i < data.products.length; i++) {
       let categoria = data.products[i]
        console.log(data.products[i])
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="${categoria.image}" alt="${categoria.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ categoria.name + ` - `+ categoria.currency + ` `+ categoria.cost + `</h4> 
                        <p> `+ categoria.description +`</p> 
                        </div>
                        <small class="text-muted">` + categoria.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    
}
