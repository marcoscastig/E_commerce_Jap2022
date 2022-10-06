const tabla_cart=document.getElementById('tabla_cart')
let array_cart = []  
const table_body=document.getElementById('table_body')

document.addEventListener("DOMContentLoaded", async function(){
    getJSONData(CART_INFO_URL).then(function (respuesta) {
       if(respuesta.status === "ok") {
        cartdefault = respuesta.data.articles[0]
        array_cart.push(cartdefault)
    }
    console.log(array_cart[0])
    
    celda(array_cart)



})})

function insertRowEntabla() {
    let newRowRef = tabla_cart.insertRow(-1);
    let newCellRef = newRowRef.insertCell(0);
    newCellRef.setAttribute("Data-Default-Item", ["default_item"]);
    newCellRef.innerHTML = (` <div class="p-0"><span class="font-weight-bold ">${array_cart[0].name}- </span>${array_cart[0].count}-${array_cart[0].unitCost} <br> 
    ${array_cart[0].name}</div>`)
  }


  function celda(array_cart) { //funcion que crea la celda 
    table_body.innerHTML =
    
    `<tr >
    <td class=""><img height="100px" src="${array_cart[0].image}" alt=""></td>
    <td class="">${array_cart[0].name}</td>
    <td class=""><input class="form-control" selected="${array_cart[0].count}" type="number"></input></td>
    <td class="">${array_cart[0].unitCost}</td>
    <td class="">${(multiplicar(array_cart[0].count,array_cart[0].unitCost) )}</td>
  </tr>
      
    ` 
  }

function multiplicar (a,b) {
    return a*b
}

/* </div>

*/