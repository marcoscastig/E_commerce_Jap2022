const tabla_cart=document.getElementById('tabla_cart')
let defaultCart = ""  
const table_body=document.getElementById('table_body')
const carro_md=document.getElementById('carro_d-md')

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
     //localStorage.setItem(`"user_cart"${usuario_name}`, JSON.stringify(cartstoragesaved))
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
    <td id="unitcost${cartOfProducts.id}">${cartOfProducts.cost}</td>
    <td id="subtotal${cartOfProducts.id}"style="font-weight: bold">${cartOfProducts.cost}</td>
  </tr>
      
    ` 
    carro_md.innerHTML +=
    `
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><img class="img-fluid" src="${cartOfProducts.images[0]}" alt=""></li>
          <li style="font-weight: bold" class="list-group-item"> <span >Nombre</span> - ${cartOfProducts.name}</li>
          <li class="list-group-item d-flex "><input onkeyup="inputTxt(${cartOfProducts.id})" id="md${cartOfProducts.id}"  class="form-control" min="1" value="1" type="number"></input></li>
          
          <li  class="list-group-item "><span style="font-weight: bold">Costo por unidad:</span> ${cartOfProducts.currency} <span id="mdunitcost${cartOfProducts.id}"> ${cartOfProducts.cost},00</span> </li>
          
          <li  class="list-group-item"><span style="font-weight: bold">Subtotal</span> ${cartOfProducts.currency} <span style="font-weight: bold" id="mdsubtotal${cartOfProducts.id}" >${cartOfProducts.cost}</span> </li>
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

