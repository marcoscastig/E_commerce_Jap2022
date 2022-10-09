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
    let idauto  = document.getElementById(`${array_cart[0].id}`)
    let subtot  = document.getElementById(`subtotal${array_cart[0].id}`)
    idauto.addEventListener("keyup", function(event){
      let num = event.path[0].value
      console.log(num)
      console.log(idauto.valueAsNumber)
      subtot.innerHTML = `${num * array_cart[0].unitCost }`
    })

})})

function insertRowEntabla() {
    let newRowRef = tabla_cart.insertRow(-1);
    let newCellRef = newRowRef.insertCell(0);
    newCellRef.setAttribute("Data-Default-Item", ["default_item"]);
    newCellRef.innerHTML = (` <div class="p-0"><span class="font-weight-bold ">${array_cart[0].name}- </span>${array_cart[0].count}-${array_cart[0].unitCost} <br> 
    ${array_cart[0].name}</div>`)
  }


  function celda(array_cart) { 
    table_body.innerHTML =
    
    `<tr >
    <td class=""><img height="100px" src="${array_cart[0].image}" alt=""></td>
    <td class="">${array_cart[0].name}</td>
    <td ><input id="${array_cart[0].id}" class="form-control" min="0" value="1"type="number"></input></td>
    <td class="">${array_cart[0].unitCost} - ${array_cart[0].currency}</td>
    <td id="subtotal${array_cart[0].id}" class="">${array_cart[0].unitCost}</td>
  </tr>
      
    ` 
  }

function multiplicar (a,b) {
    return a*b
}



/* </div>

*/

