const tabla_cart=document.getElementById('tabla_cart')
let array_cart = []  
const table_body=document.getElementById('table_body')
const carro_md=document.getElementById('carro_d-md')



document.addEventListener("DOMContentLoaded", async function(){
    getJSONData(CART_INFO_URL).then(function (respuesta) {
    const car = (element) => element  === "50924"
    let cartValidation = cartstoragesaved.some(car)
    if(cartValidation === false){
      cartstoragesaved.unshift("50924")
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
    
})})

function celdacarro(cartOfProducts) { 
    table_body.innerHTML +=
    
    `<tr>
    <td><img height="100px" src="${cartOfProducts.images[0]}" alt=""></td>
    <td>${cartOfProducts.name}</td>
    <td><input onkeyup="inputTxt(${cartOfProducts.id})" id="${cartOfProducts.id}" class="form-control" min="1" value="1"  type="number"></input></td>
    <td id="unitcost${cartOfProducts.id}">${cartOfProducts.cost}</td>
    <td>${cartOfProducts.currency}</td>
    <td id="subtotal${cartOfProducts.id}" class="">${cartOfProducts.cost}</td>
  </tr>
      
    ` 
    carro_md.innerHTML +=
    `
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><img class="img-fluid" src="${cartOfProducts.images[0]}" alt=""></li>
          <li class="list-group-item"> <span class="font-weight-bold">Nombre</span> - ${cartOfProducts.name}</li>
          <li class="list-group-item d-flex "><input onkeyup="inputTxt(${cartOfProducts.id})" id="md${cartOfProducts.id}"  class="form-control" min="1" value="1" type="number"></input></li>
          
          <li id="mdunitcost${cartOfProducts.id}" class="list-group-item ">${cartOfProducts.cost} ${cartOfProducts.currency}</li>
          
          <li  class="list-group-item"><span style="font-weigth: bold;">Subtotal</span> <span id="mdsubtotal${cartOfProducts.id}" class="font-weight-bold">${cartOfProducts.cost}</span> </li>
        </ul>
      `
  }

function inputTxt(id) {
  let num = event.path[0].value
  let inputLg = document.getElementById(`${id}`)
  let inputMd = document.getElementById(`md${id}`)
  if((inputLg.value != inputMd.value)){
    inputLg.value = num
  } if((inputMd.value != inputLg.value)) {
    inputMd.value = inputLg.value
  }
  document.getElementById(`subtotal${id}`).innerHTML = num * (parseInt((document.getElementById(`unitcost${id}`).textContent))) 
  document.getElementById(`mdsubtotal${id}`).innerHTML = num * (parseInt((document.getElementById(`mdunitcost${id}`).textContent)))
}

