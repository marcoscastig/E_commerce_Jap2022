const tabla_cart=document.getElementById('tabla_cart')
let array_cart = []  
const table_body=document.getElementById('table_body')
const carro_md=document.getElementById('carro_d-md')



document.addEventListener("DOMContentLoaded", async function(){
    getJSONData(CART_INFO_URL).then(function (respuesta) {
      
       if(respuesta.status === "ok") {
        cartdefault = respuesta.data.articles[0]
        array_cart.push(cartdefault)
        
    }
    console.log(array_cart[0])
    
    celda(array_cart) 
    let idauto  = document.getElementById(`${array_cart[0].id}`)
    let subtot  = document.getElementById(`subtotal${array_cart[0].id}`)
    cartstoragesaved.forEach(idproducto => {
      getJSONData(`https://japceibal.github.io/emercado-api/products/${idproducto}${EXT_TYPE}`).then(function (respuesta){
        if(respuesta.status === "ok"){
          cartOfProducts = respuesta.data
          //console.log(cartOfProducts)
          celdacarro(cartOfProducts)
        }
      })

    });
})})

  function celda(array_cart) { 
    table_body.innerHTML =
    
    `<tr >
    <td class=""><img height="100px" src="${array_cart[0].image}" alt=""></td>
    <td class="">${array_cart[0].name}</td>
    <td ><input onkeyup="hola()" id="${array_cart[0].id}" class="form-control" min="0" value="1"type="number"></input></td>
    <td class="">${array_cart[0].unitCost}</td>
    <td class="">${array_cart[0].currency}</td>
    <td id="subtotal${array_cart[0].id}" class="">${array_cart[0].unitCost}</td>
  </tr>
      
    ` 
  }

function celdacarro(cartOfProducts) { 
    table_body.innerHTML +=
    
    `<tr>
    <td><img height="100px" src="${cartOfProducts.images[0]}" alt=""></td>
    <td>${cartOfProducts.name}</td>
    <td><input onkeyup="hola(${cartOfProducts.id})" id="${cartOfProducts.id}" class="form-control" min="0" type="number"></input></td>
    <td id="unitcost${cartOfProducts.id}">${cartOfProducts.cost}</td>
    <td>${cartOfProducts.currency}</td>
    <td id="subtotal${cartOfProducts.id}" class="">${cartOfProducts.cost}</td>
  </tr>
      
    ` 
    carro_md.innerHTML +=
    `
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><img class="img-fluid" src="${cartOfProducts.images[0]}" alt=""></li>
          <li class="list-group-item">${cartOfProducts.name}</li>
          <li class="list-group-item"><input onkeyup="hola(${cartOfProducts.id})" id="md${cartOfProducts.id}" class="form-control" min="0" type="number"></input></li>
          <li id="mdunitcost${cartOfProducts.id}" class="list-group-item">${cartOfProducts.cost}</li>
          <li class="list-group-item">${cartOfProducts.currency}</li>
          <li id="mdsubtotal${cartOfProducts.id}" class="list-group-item">${cartOfProducts.cost}</li>
        </ul>
      `
  }

function hola(id) {
  let num = event.path[0].value
  //document.getElementById(`md${cartOfProducts.id}`).innerHTML += document.getElementById(`${id}`).value
  //console.log(document.getElementById(`md${id}`).value)
  //console.log(document.getElementById(`${id}`).value)
  document.getElementById(`subtotal${id}`).innerHTML = num * (parseInt((document.getElementById(`unitcost${id}`).textContent))) 
  document.getElementById(`mdsubtotal${id}`).innerHTML = num * (parseInt((document.getElementById(`mdunitcost${id}`).textContent)))
  
}


/*function igualdad (id) {
  if ((document.getElementById(`md${cartOfProducts.id}`).value) != (document.getElementById(`${id}`).value)) {
    (document.getElementById(`md${cartOfProducts.id}`).value) === (document.getElementById(`${id}`).value) }}
    */