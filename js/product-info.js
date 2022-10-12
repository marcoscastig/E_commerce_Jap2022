const Productos_info_div = document.getElementById("Productos_info_div")
const Productos_info_div_2 = document.getElementById("Productos_info_div_2")
const tablaid = document.getElementById("tabla_comments")
const Productos_relacionados = document.getElementById("productos_relacionados")
const Productos_relacionados_div = document.getElementById("contenedor_productos_relacionados")
const contenedorComentarios = document.getElementById("contenedorComentarios")
FormComent = document.getElementById("FormComent")
let usesrscart = [PRODID]


function HtmlProductosInfo(productos_info) {
  Productos_info_div.innerHTML += `<div class="text-center ">
  <h2>Puede ser tuyo</h2> <button id="btn_buy" type="button" class="btn btn-success text-end">Success</button>
  <p class="lead">Verás aquí toda la informacion sobre ${productos_info.name}</p>
  </div>
  
  <div  class=" list-group  rounded-0 px-2 ">
    <div class="row">
        <div class="col justify-content-center align-items-center">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h2>${productos_info.name}</h2>
                <p class="lead" >${productos_info.description} </p> 
                <h2>Precio ${productos_info.currency} ${productos_info.cost}</h2>
                <small class="text-muted pb-1">Cantidad de vendidos ${productos_info.soldCount}</small>
                </div>
            </div>
            </div>
            </div>
            <div id="imagenes_ilustrativas" class="row ">
            </div>
            </div>
`
}
function showProduct() {
  for (let i = 0; i < productos_info.length; i++) {
    let product_content = productos_info[i]
    Productos_info_div.innerHTML += HtmlProductosInfo(product_content);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  getJSONData(PRODUCT_INFO_URL).then(function (respuesta) {
    if (respuesta.status === "ok") {
      productos_info = respuesta.data
      productos_images = respuesta.data.images
      HtmlProductosInfo(productos_info)
      let btn_buy =  document.getElementById('btn_buy')
        
      btn_buy.addEventListener("click", function (){
        if (cartstoragesaved.length === 0){
          localStorage.setItem(`"user_cart"${usuario_name}`, JSON.stringify(usesrscart))
        }  else {
          const idprod = (element) => element  === PRODID
          let verifycart = cartstoragesaved.some(idprod)
          if(verifycart === false)
          cartstoragesaved.push(PRODID)
          localStorage.setItem(`"user_cart"${usuario_name}`, JSON.stringify(cartstoragesaved))
        }
        })
      let imagenes_ilustrativas = document.getElementById("imagenes_ilustrativas")
      let imagenes = ""
      imagenes +=`<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner align-items-center">
    <div class="carousel-item active">
      <img class="rounded mx-auto d-block img-fluid img-thumbnail" src="${productos_images[0]}" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="rounded mx-auto d-block img-fluid img-thumbnail" src="${productos_images[1]}" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="rounded mx-auto d-block img-fluid img-thumbnail" src="${productos_images[2]}" alt="Third slide">
    </div>
    <div class="carousel-item">
      <img class="rounded mx-auto d-block img-fluid img-thumbnail" src="${productos_images[3]}" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`
      imagenes_ilustrativas.innerHTML += imagenes
    }
  })
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (respuesta) {
    if (respuesta.status === "ok") {
      productos_comments = respuesta.data
      const myObjarraycomment = JSON.parse(localStorage.getItem(`"comments_user"${PRODID}`)) || [];
      if((productos_comments.length === 0) && (myObjarraycomment.length === 0) ){
        contenedorComentarios.classList.add("visually-hidden")
      } else {contenedorComentarios.classList.remove("visually-hidden")}
     productos_comments.forEach(Formularioelement => {
      insertRowEntabla(Formularioelement)
    })
     myObjarraycomment.forEach(Formularioelement => {
      insertRowEntabla(Formularioelement)
    }
    )
  }
  })
  getJSONData(PRODUCT_INFO_URL) .then(function(respuesta){
    if(respuesta.status === "ok"){
        productos_relacionados = respuesta.data.relatedProducts
        let articulos = ""
        for (let i = 0; i < productos_relacionados.length; i++) {
          const relacionados = productos_relacionados[i];
           
          Productos_relacionados_div.classList.remove("visually-hidden")
          articulos += `
          <div onclick="setIDProd(${relacionados.id})" class="col-xs-2 col-sm-5 col-md-4 col-lg-3 ">
          <a  href="#"><img  src="${relacionados.image}"class="img-fluid img-thumbnail px-2">
          </a>
          <p class="text-center">${relacionados.name} </p> 
          </div>
          `
      }
        Productos_relacionados.innerHTML += articulos
    }  
    })
    
})
FormComent.addEventListener('submit', function (event) {
  event.preventDefault();
  const Form_data = new FormData(FormComent)
  if(Form_data.get('description_prod') != ""){
  Obj_form = convertirFormComentEnObj(Form_data)
  GuardarObjenLocalStorage(Obj_form)
  insertRowEntabla(Obj_form)
  FormComent.reset()
  contenedorComentarios.classList.remove("visually-hidden")
} else {
  alert ("Esperamos tu comentario, no seas timd@   ; )")
}
})
function convertirFormComentEnObj(Form_data) {
  let product = parseInt(PRODID);
  let score = parseInt(Form_data.get('score_prod'));
  let description = Form_data.get('description_prod');
  let user = usuario_name;
  let dateAndTime = new Date
  let dateTime = dateAndTime.toLocaleString();
  let fecha = convertDateFormat(dateTime.slice(0,9))
  let hora = dateTime.slice(11,19)
  let dateTimeUser = fecha +" "+ hora
  return {
    "product": product,
    "score": score,
    "description": description,
    "user": user,
    "dateTime": dateTimeUser
  }
}
function GuardarObjenLocalStorage(Obj_form) {
  let arreglo_obj = (JSON.parse(localStorage.getItem(`"comments_user"${PRODID}`))) || []
  arreglo_obj.push(Obj_form)
  localStorage.setItem(`"comments_user"${PRODID}`, JSON.stringify(arreglo_obj))
}
function insertRowEntabla(Obj_form) {
  let tablaid = document.getElementById("tabla_comments");
  let newRowRef = tablaid.insertRow(-1);
  let newCellRef = newRowRef.insertCell(0);
  newCellRef.setAttribute("Data-Formulario-Score", Obj_form["score"]);
  newCellRef.innerHTML = (` <div class="p-0"><span class="font-weight-bold ">${Obj_form["user"]}- </span>${Obj_form["dateTime"]}-${tipo_de_puntuacion(Obj_form["score"])} <br> 
  ${(Obj_form["description"])}</div>`)
}

  
