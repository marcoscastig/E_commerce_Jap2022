const Productos_info_div = document.getElementById("Productos_info_div")
const Productos_info_div_2 = document.getElementById("Productos_info_div_2")
const tablaid = document.getElementById("tabla_comments")
const Productos_relacionados = document.getElementById("productos_relacionados")


function HtmlProductosInfo(productos_info) {
  Productos_info_div.innerHTML += `<div  class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col justify-content-center align-items-center">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h1>${productos_info.name} </h1>
                <h2>Precio</h2>
                <h3>${productos_info.currency} ${productos_info.cost} </h3>
                <h2>Descripción</h2>
                <h4>${productos_info.description} </h4> 
                <h2>Cantidad de vendidos</h2>
                <h3>${productos_info.soldCount} vendidos</h3> 
                </div>
            </div>
            </div>
            </div>
            <div id="imagenes_ilustrativas" class="row ">
            <h1>Imagenes ilustrativas </h1>  
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
      let imagenes_ilustrativas = document.getElementById("imagenes_ilustrativas")
      let imagenes = ""
      for (let i = 0; i < productos_images.length; i++) {
        const imagen = productos_images[i];
        imagenes += `<div class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
        <img src="${imagen}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
        </div> 
        `
      }
      imagenes_ilustrativas.innerHTML += imagenes
    }
  })

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (respuesta) {
    if (respuesta.status === "ok") {
      productos_comments = respuesta.data
      console.log(productos_comments)
    }
    productos_comments.forEach(Formularioelement => {
      insertRowEntabla(Formularioelement)
    });
    const myObjarraycomment = JSON.parse(localStorage.getItem(`"comments_user"${PRODID}`)) || [];
     myObjarraycomment.forEach(Formularioelement => {
      insertRowEntabla(Formularioelement)
    }
    );
  })
  getJSONData(PRODUCTS_URL) .then(function(respuesta){
    if(respuesta.status === "ok"){
        productos_relacionados = respuesta.data.products
        let articulos = ""
        for (let i = 0; i < productos_relacionados.length; i++) {
          const relacionados = productos_relacionados[i];
          if(relacionados.id != parseInt(PRODID)) {
          articulos += `
          <div onclick="setIDProd(${relacionados.id})" class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
          <img  src="${relacionados.image}"class="img-fluid img-thumbnail">
          <p>${relacionados.name} </p> 
          </div>
          `
        }
      }
        Productos_relacionados.innerHTML += articulos
    }  
    })
})

FormComent = document.getElementById("FormComent")

FormComent.addEventListener('submit', function (event) {
  event.preventDefault();
  const Form_data = new FormData(FormComent)
  Obj_form = convertirFormComentEnObj(Form_data)
  GuardarObjenLocalStorage(Obj_form)
  insertRowEntabla(Obj_form)
  FormComent.reset()
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
  console.log(arreglo_obj)
}

function insertRowEntabla(Obj_form) {
  let tablaid = document.getElementById("tabla_comments");
  let newRowRef = tablaid.insertRow(-1);
  let newCellRef = newRowRef.insertCell(0);
  newCellRef.setAttribute("Data-Formulario-Score", Obj_form["score"]);
  newCellRef.innerHTML = (` <span class="font-weight-bold ">${Obj_form["user"]}- </span>${Obj_form["dateTime"]}-${tipo_de_puntuacion(Obj_form["score"])} <br> 
  ${(Obj_form["description"])}`)
}

function convertDateFormat(string) {
  var info = string.split('/');
  return info[2] + '-' + info[1] + '-' + info[0];
}

