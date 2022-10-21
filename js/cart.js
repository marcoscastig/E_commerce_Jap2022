const tabla_cart=document.getElementById('tabla_cart')
let defaultCart = ""  
const table_body = document.getElementById('table_body')
const carro_md = document.getElementById('carro_d-md')
const usdPrice = document.getElementById('usdPrice')
const subtotalGeneral = document.getElementById('subtotalGeneral')
const envio = document.getElementById('envio')
const suma = document.getElementById('suma')
const USDvalue = 41.5
const mayor = document.getElementById('mayor')
const mediano = document.getElementById('mediano')
const barato = document.getElementById('barato')

document.addEventListener("DOMContentLoaded", async function(){
    getJSONData(CART_INFO_URL).then(function (respuesta) {
      if(respuesta.status === "ok"){
        cartOfProducts = respuesta.data
        let idDefault= cartOfProducts.articles[0].id
        
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
    cargarProductos()
    
  }
  
})})


function celdacarro(cartOfProducts) { 
  if(cartOfProducts.currency === "UYU"){
    cartOfProducts.currency = "USD"
    cartOfProducts.cost = parseInt(cartOfProducts.cost/USDvalue).toFixed(2)
  }
    table_body.innerHTML +=
    
    `<tr>
    <td><img height="100px" src="${cartOfProducts.images[0]}" alt=""></td>
    <td>${cartOfProducts.name}</td>
    <td><input  onkeyup="inputTxt(${cartOfProducts.id})" style="width: 81px;" placeholder="1" id="${cartOfProducts.id}" class="form-control" min="0"  value="1" type="number" required ></input></td>
    <td ><span id="unitcost${cartOfProducts.id}"> ${cartOfProducts.cost}</span> ${cartOfProducts.currency}</td>
    <td style="font-weight: bold"><span id="subtotal${cartOfProducts.id}">${cartOfProducts.cost}</span>  <span id="moneda${cartOfProducts.id}">${cartOfProducts.currency}</span></td>
    <td><button onclick="borrar(${cartOfProducts.id})" id="btn_buy" type="button" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg></button><td>  
    </tr>
    ` 
    carro_md.innerHTML +=
    `
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><img class="img-fluid" src="${cartOfProducts.images[0]}" alt=""></li>
          <li style="font-weight: bold" class="list-group-item"> <span >Nombre</span> - ${cartOfProducts.name}</li>
          <li class="list-group-item d-flex "><input   onkeyup="inputTxt(${cartOfProducts.id})" id="md${cartOfProducts.id}"  placeholder="1" class="form-control" min="0"  value="1" type="number" ></input></li>
      
          <li  class="list-group-item "><span style="font-weight: bold">Costo por unidad:</span> ${cartOfProducts.currency} 
          <span id="mdunitcost${cartOfProducts.id}"> ${cartOfProducts.cost}</span> </li>
          
          <li  class="list-group-item"><span style="font-weight: bold">Subtotal</span> <span style="font-weight: bold" id="mdsubtotal${cartOfProducts.id}" >${cartOfProducts.cost}</span>
          <span id="mdmoneda${cartOfProducts.id}">${cartOfProducts.currency}</span> </li>
          <li  class="list-group-item"><button onclick="borrar(${cartOfProducts.id})" id="btn_buy" type="button" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg> <span> Eliminar ${cartOfProducts.name}</span> </button></li>
        </ul>
      `
  }

  function inputTxt(id) {
  let num = event.path[0].value
 
  let idproducto = document.getElementById(`${cartOfProducts.id}`)
  let inputLg = document.getElementById(`${id}`)
  let inputMd = document.getElementById(`md${id}`)
  let unitxcost = (num * (parseInt((document.getElementById(`unitcost${id}`).textContent)))) 
  
if((num < 1)){    
  unitxcost = (1 * (parseInt((document.getElementById(`unitcost${id}`).textContent)))) 
  document.getElementById(`subtotal${id}`).innerHTML = unitxcost
  document.getElementById(`mdsubtotal${id}`).innerHTML = unitxcost
  inputLg.value = ""
  inputMd.value = ""
  console.log("es menor a 1")
}

  if((inputLg.value != inputMd.value)){
    inputLg.value = num
  } 
  if((inputMd.value != inputLg.value)) {
    inputMd.value = num
  }
  document.getElementById(`subtotal${id}`).innerHTML = unitxcost
  document.getElementById(`mdsubtotal${id}`).innerHTML = unitxcost

  buscarenarray ()
}
function buscarenarray (){
  let arrayunitxcost = []
  for (let i = 0; i < cartstoragesaved.length; i++) {
    const element = cartstoragesaved[i];
    let selector = document.getElementById(`subtotal${element}`).textContent
    arrayunitxcost.push(parseInt(selector))
    
  }
let total = arrayunitxcost.reduce((a, b) => a + b, 0);
subtotalGeneral.innerHTML=total
if(mayor.checked){
envio.innerHTML= (total*0.15).toFixed(2)
subtotalMasEnvio()
}
if(mediano.checked){
  envio.innerHTML= (total*0.07).toFixed(2)
  subtotalMasEnvio()
  } 
  if(barato.checked){
    envio.innerHTML= (total*0.05).toFixed(2)
    subtotalMasEnvio()
    }  

}
function borrar(id){
  let arrayEliminado = cartstoragesaved.filter(element => element != id)
  localStorage.setItem(`"user_cart"${usuario_name}`, JSON.stringify(arrayEliminado))
  window.location.reload()
}
let array2 = []
function cargarProductos() {
  cartstoragesaved.forEach(idproducto => {
    getJSONData(`https://japceibal.github.io/emercado-api/products/${idproducto}${EXT_TYPE}`).then(function (respuesta){
      if(respuesta.status === "ok"){
        cartOfProducts = respuesta.data
        celdacarro(cartOfProducts)
      }
      if(cartOfProducts.currency === "UYU"){
        cartOfProducts.currency = "USD"
        cartOfProducts.cost = parseInt(cartOfProducts.cost/USDvalue).toFixed(2)
      }
      array2.push(parseInt(cartOfProducts.cost))
      let subtotal = array2.reduce((a, b) => a + b, 0);
      subtotalGeneral.innerHTML=subtotal
      envio.innerHTML= (subtotal * 0.15).toFixed(2)
      subtotalMasEnvio()
    })
  });
}

mayor.addEventListener("click",function(){
  let subtotal = subtotalGeneral.textContent
  envio.innerHTML=(subtotal*0.15.toFixed(2))
  subtotalMasEnvio ()
})

mediano.addEventListener("click",function(){
  let subtotal = subtotalGeneral.textContent
  envio.innerHTML=(subtotal*0.07).toFixed(2)
  subtotalMasEnvio ()
})
barato.addEventListener("click",function(){
  let subtotal = subtotalGeneral.textContent
  envio.innerHTML=(subtotal*0.05).toFixed(2)
  subtotalMasEnvio ()
})

function subtotalMasEnvio () {
  suma.innerHTML=(parseInt(envio.textContent)+parseInt(subtotalGeneral.textContent))
}


/*let prueba =document.getElementById('prueba')
prueba.addEventListener("click", function(){
  if(((document.getElementById('50924')).value === "") || ((document.getElementById('50924')).value === 0)  )
  console.log("llenar input")
})*/