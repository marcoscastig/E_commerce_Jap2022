const tabla_cart=document.getElementById('tabla_cart')
let defaultCart = ""  
const table_body = document.getElementById('table_body')
const carro_md = document.getElementById('carro_d-md')
const usdPrice = document.getElementById('usdPrice')
const subtotalGeneral = document.getElementById('subtotalGeneral')

document.addEventListener("DOMContentLoaded", async function(){
    getJSONData(CART_INFO_URL).then(function (respuesta) {
      if(respuesta.status === "ok"){
        cartOfProducts = respuesta.data
        let idDefault= cartOfProducts.articles[0].id
        console.log(cartOfProducts.articles[0].id)
        defaultCart = (idDefault.toString())
    const car = (element) => element  === defaultCart
    let cartValidation = cartstoragesaved.some(car)
    if(cartValidation === false){
      cartstoragesaved.unshift(defaultCart)
      localStorage.setItem(`"user_cart"${usuario_name}`, JSON.stringify(cartstoragesaved))
    } else {
     let cart2= cartstoragesaved.filter(element=> element !=defaultCart )
     cart2.unshift(defaultCart)
     cartstoragesaved = cart2
     localStorage.setItem(`"user_cart"${usuario_name}`, JSON.stringify(cartstoragesaved))
    }
    cartstoragesaved.forEach(idproducto => {
      getJSONData(`https://japceibal.github.io/emercado-api/products/${idproducto}${EXT_TYPE}`).then(function (respuesta){
        if(respuesta.status === "ok"){
          cartOfProducts = respuesta.data
          celdacarro(cartOfProducts)
        }
      })
      
    });
  }
})})

function celdacarro(cartOfProducts) { 
    table_body.innerHTML +=
    
    `<tr>
    <td><img height="100px" src="${cartOfProducts.images[0]}" alt=""></td>
    <td>${cartOfProducts.name}</td>
    <td><input onkeyup="inputTxt(${cartOfProducts.id})" style="width: 81px;" id="${cartOfProducts.id}" class="form-control" min="1" value="1"  type="number"></input></td>
    <td ><span id="unitcost${cartOfProducts.id}"> ${cartOfProducts.cost}</span> ${cartOfProducts.currency}</td>
    <td style="font-weight: bold"><span id="subtotal${cartOfProducts.id}">${cartOfProducts.cost}</span>  <span id="moneda${cartOfProducts.id}">${cartOfProducts.currency}</span></td>
  </tr>
      
    ` 
    carro_md.innerHTML +=
    `
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><img class="img-fluid" src="${cartOfProducts.images[0]}" alt=""></li>
          <li style="font-weight: bold" class="list-group-item"> <span >Nombre</span> - ${cartOfProducts.name}</li>
          <li class="list-group-item d-flex "><input onkeyup="inputTxt(${cartOfProducts.id})" id="md${cartOfProducts.id}"  class="form-control" min="1" value="1" type="number"></input></li>
      
          <li  class="list-group-item "><span style="font-weight: bold">Costo por unidad:</span> ${cartOfProducts.currency} 
          <span id="mdunitcost${cartOfProducts.id}"> ${cartOfProducts.cost}</span> </li>
          
          <li  class="list-group-item"><span style="font-weight: bold">Subtotal</span> <span style="font-weight: bold" id="mdsubtotal${cartOfProducts.id}" >${cartOfProducts.cost}</span>
          <span id="mdmoneda${cartOfProducts.id}">${cartOfProducts.currency}</span> </li>
        </ul>
      `
  }

function inputTxt(id) {
  let num = event.path[0].value
  let idproducto = document.getElementById(`${cartOfProducts.id}`)
  let inputLg = document.getElementById(`${id}`)
  let inputMd = document.getElementById(`md${id}`)
  let unitxcost = (num * (parseInt((document.getElementById(`unitcost${id}`).textContent)))) 
  

  //let mdunitxcost = num * (parseInt((document.getElementById(`mdunitcost${id}`).textContent)))
  if((inputLg.value != inputMd.value)){
    inputLg.value = num
  } if((inputMd.value != inputLg.value)) {
    inputMd.value = inputLg.value
  }
  let inputobj = {
    id: id,
    precio: unitxcost
  }
  let arrayunitxcost = []
  arrayunitxcost.push(inputobj)
  console.log(arrayunitxcost)
  
  
  document.getElementById(`subtotal${id}`).innerHTML = unitxcost
  document.getElementById(`mdsubtotal${id}`).innerHTML = unitxcost
  //showSubtotal (unitxcost)
}

var myHeaders = new Headers();
myHeaders.append("apikey", "wRdc91FF6D5jCTfI6V4FzIGp8mk3F9OW");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

/*fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=uyu&base=usd", requestOptions)
  .then(response => response.json())
  .then(result => imprimirTipoDeCambio(result))
  .catch(error => console.log('error', error));
  function imprimirTipoDeCambio (rate){
    //console.log(typeof(rate.rates.UYU))
    //console.log((rate.rates.UYU))
    usdPrice.innerHTML = rate.rates.UYU
   }*/

 

 /*function showSubtotal (unitxcost){
  subtotalGeneral.innerHTML = unitxcost
  innersubtotal(arrayunitxcost)
 }*/


function innersubtotal() {
  element=50924
console.log(arrayunitxcost.lastIndexOf(element))
  
}



 /*const buscar_producto = ()=> {
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
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('ewr'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1



*/
console.log(cartstoragesaved)