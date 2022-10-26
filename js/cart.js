const tabla_cart = document.getElementById('tabla_cart')
let defaultCart = ""  
const table_body = document.getElementById('table_body')
const carro_md = document.getElementById('carro_d-md')
const subtotalGeneral = document.getElementById('subtotalGeneral')
const envio = document.getElementById('envio')
const suma = document.getElementById('suma')
const USDvalue = 41.5
const mayor = document.getElementById('mayor')
const mediano = document.getElementById('mediano')
const barato = document.getElementById('barato')
const validacion = document.getElementById('validacion')
let tarjeta = document.getElementById('validationFormCheck2')
let banco = document.getElementById('validationFormCheck3')
let array2 = []
let tarjeta1 = document.getElementById('cardnumber1')
let tarjeta2 = document.getElementById('cardnumber2')
let tarjeta3 = document.getElementById('cardnumber3')
let transfer = document.getElementById('transfer')
const comprar = document.getElementById('comprar')
const calle = document.getElementById('calle')
const numero = document.getElementById('numero')
const esquina = document.getElementById('esquina')
const spanFormaDePago = document.getElementById('spanFormaDePago')
const tarjetaRadio = document.getElementById('validationFormCheck2')
const transferenciaRadio = document.getElementById('validationFormCheck3')
const cerrarModal = document.getElementById('cerrarModal')
const cerrarModal2 = document.getElementById('cerrarModal2')
let dateAndTime = new Date
let dateTime = dateAndTime.toLocaleString();
let fecha = convertDateFormat(dateTime.slice(0,10))
const msjsCarrito = document.getElementById('alerta_carrito')
const formulario = document.getElementById('formulario')
const cabeceraTabla = document.getElementById('cabeceraTabla')
const paginaPrincipal = document.getElementById('paginaPrincipal')

let arrayinput = []

document.addEventListener("DOMContentLoaded", async function(){
  if(cartstoragesaved.length===0){
    console.log("carro en 0")
    formulario.classList.add('d-none')
    cabeceraTabla.classList.add('d-none')
    paginaPrincipal.innerHTML=`<h2 style="color: orange;" >Carrito de compras</h2>
    <p style="color: orange;" class="lead">No tienes compras por completar, clickea abajo y ve nuestros productos.</p>
    <button onclick="categories()" class="btn btn-success" style="color: orange;">Categorias</button>
    `
    
  }
  
    getJSONData(CART_INFO_URL).then(function (respuesta) {
      if(respuesta.status === "ok"){
        cartOfProducts = respuesta.data
        
      /*  let idDefault= cartOfProducts.articles[0].id
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
    }*/
    cargarProductos()
    
  }
  
})})

function categories(){
  window.location.replace("categories.html")
}

function celdacarro(cartOfProducts) { 
  if(cartOfProducts.currency === "UYU"){
    cartOfProducts.currency = "USD"
    cartOfProducts.cost = parseInt(cartOfProducts.cost/USDvalue).toFixed(2)
  }
    table_body.innerHTML +=
    
    `<tr>
    <td><img height="100px" src="${cartOfProducts.images[0]}" alt=""></td>
    <td>${cartOfProducts.name}</td>
    <td><input  onkeyup="inputTxt(${cartOfProducts.id})" style="width: 81px;"  id="${cartOfProducts.id}" class="form-control" min="1"  value="1" type="number" required ></input></td>
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
        <ul class="list-group list-group-flush pb-2">
          <li class="list-group-item"><img class="img-fluid" src="${cartOfProducts.images[0]}" alt=""></li>
          <li style="font-weight: bold" class="list-group-item"> <span >Nombre</span> - ${cartOfProducts.name}</li>
          <li class="list-group-item d-flex "><input   onkeyup="inputTxt(${cartOfProducts.id})" id="md${cartOfProducts.id}" class="form-control" min="1" value="1" type="number"></input></li>
          <li  class="list-group-item "><span style="font-weight: bold">Costo por unidad:</span> ${cartOfProducts.currency} 
          <span id="mdunitcost${cartOfProducts.id}"> ${cartOfProducts.cost}</span> </li>
          <li  class="list-group-item"><span style="font-weight: bold">Subtotal</span> <span style="font-weight: bold" id="mdsubtotal${cartOfProducts.id}" >${cartOfProducts.cost}</span>
          <span id="mdmoneda${cartOfProducts.id}">${cartOfProducts.currency}</span> </li>
          
          <li  class="list-group-item d-grid"><button onclick="borrar(${cartOfProducts.id})" id="btn_buy" type="button" class="btn  btn-danger"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
  //let idproducto = document.getElementById(`${cartOfProducts.id}`)
  let inputLg = document.getElementById(`${id}`)
  let inputMd = document.getElementById(`md${id}`)
  let unitxcost = (num * (parseInt((document.getElementById(`unitcost${id}`).textContent)))) 
  
if((num === 0)){    
  unitxcost = (1 * (parseInt((document.getElementById(`unitcost${id}`).textContent)))) 
  document.getElementById(`subtotal${id}`).innerHTML = unitxcost
  document.getElementById(`mdsubtotal${id}`).innerHTML = unitxcost
  inputLg.value = ""
  inputMd.value = ""
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
      subtotalGeneral.innerHTML=subtotal.toFixed(2)
      envio.innerHTML= (subtotal * 0.15).toFixed(2)
      subtotalMasEnvio()
    })
  });
}
function subtotalMasEnvio () {
  suma.innerHTML=(parseInt(envio.textContent)+parseInt(subtotalGeneral.textContent)).toFixed(2)
}
mayor.addEventListener("click",function(){
  let subtotal = subtotalGeneral.textContent
  envio.innerHTML=(subtotal*0.15).toFixed(2)
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


banco.addEventListener("click", function (){
  if(banco.checked){
    tarjeta1.setAttribute('readonly', true)
    tarjeta2.setAttribute('readonly', true)
    tarjeta3.setAttribute('readonly', true)
    transfer.setAttribute('required', true)
    transfer.removeAttribute('readonly')
  }
})
tarjeta.addEventListener("click", function (){
  if(tarjeta.checked){
    transfer.setAttribute('readonly',true)
    tarjeta1.removeAttribute('readonly')
    tarjeta2.removeAttribute('readonly')
    tarjeta3.removeAttribute('readonly')
    tarjeta1.setAttribute('required', true)
    tarjeta2.setAttribute('required', true)
    tarjeta3.setAttribute('required', true)
  }
})
tarjeta1.addEventListener('input', function(event){
  if( tarjeta1.value.length != 12){
    tarjeta1.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})
tarjeta2.addEventListener('input', function(event){
  
  if( tarjeta2.value.length != 3){
    tarjeta2.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})
tarjeta3.addEventListener('input', function(event){
  
  if((fecha > tarjeta3.value) ){
    tarjeta3.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})
transfer.addEventListener('input', function (event){
  if(transfer.value.length <=4) {
    transfer.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})
calle.addEventListener('input', function (event){
  if(calle.value.length ===0) {
    calle.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})
numero.addEventListener('input', function (event){
  if(calle.value.length ===0) {
    calle.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})
esquina.addEventListener('input', function (event){
  if(calle.value.length ===0) {
    calle.setCustomValidity('invalid');
  } else {
    event.target.setCustomValidity('');
  }
})

comprar.addEventListener("click",function(event){
  arrayinput = []
  event.preventDefault()
  let inputs=document.querySelectorAll('td > input')
  inputs.forEach(element =>
  validarInput(element))
  alertaInput ()
  ocultarSpan ()
  if ((ocultarSpan(true)) && (((calle.value.length !=0) &&(esquina.value.length !=0) &&(numero.value.length !=0)&&(arrayinput.length ===0)))) {
    document.getElementById('alerta_carrito').innerHTML = ""
    msjsCarrito.classList.remove('d-none')
    msjsCarrito.innerHTML = `
    <div class="alert alert-success alert-dismissible " id="alertaArticulos" role="alert">
            <strong>Compra realizada!</strong> Su compra ha finalizado.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
         
          setTimeout(function(){ msjsCarrito.classList.add('d-none') }, (2500) )
  } 
  })
  
  cerrarModal.addEventListener('click', function(){
    ocultarSpan () 
  })
  cerrarModal2.addEventListener('click', function(){
    ocultarSpan ()
  })

function ocultarSpan () {
  if(((tarjeta.checked) && (tarjeta1.value.length === 12) && (tarjeta2.value.length === 3) && (tarjeta3.value.length ===10) && (fecha < tarjeta3.value )) || ((banco.checked) && (transfer.value.length >4))){
    spanFormaDePago.classList.add('d-none')
    return true
  }
  else {
    spanFormaDePago.classList.remove('d-none')
  }
}
function validarInput(input){
  if((input.value.length === 0) || (input.value === "0")){
     arrayinput.push("1")
     
  } 
}
function alertaInput(){
  if(arrayinput.length !=0){
    msjsCarrito.classList.remove('d-none')
    msjsCarrito.innerHTML = `
    <div class="alert alert-warning alert-dismissible " id="alertaArticulos" role="alert">
            <strong>Hay articulos cuya cantidad es cero!</strong> Elige una cantidad valida de articulos.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
          setTimeout(function(){ msjsCarrito.classList.add('d-none') }, (3200) )
  } else {
    msjsCarrito.innerHTML = ""
  }
}


