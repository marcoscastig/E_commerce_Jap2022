const Productos_info_div = document.getElementById("Productos_info_div")
const Productos_info_div_2 = document.getElementById("Productos_info_div_2")
const tablaid = document.getElementById("tabla_comments")

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
                <br>
                <br>
                </div>
            </div>
            </div>
            </div>
            <div class="row ">
            <h1>Imagenes ilustrativas </h1>
            <div class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
            
            <img src="${productos_info.images[0]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
            </div>
            <div class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
            <img src="${productos_info.images[1]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
            </div>
            <div class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
            <img src="${productos_info.images[2]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
            </div>
            <div class="col-xs-2 col-sm-5 col-md-4 col-lg-3">
            <img src="${productos_info.images[3]}" alt="${productos_info.description}" class="img-fluid img-thumbnail">
            </div>
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
    }
  })

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (respuesta) {
    if (respuesta.status === "ok") {
      productos_comments = respuesta.data

    }

    localStorage.setItem(`"comments"${PRODID}`, JSON.stringify(productos_comments))
    const myObjarray = JSON.parse(localStorage.getItem(`"comments"${PRODID}`)) || [];
    productos_comments.forEach(Formularioelement => {
      insertRowEntabla(Formularioelement)
    });
    const myObjarraycomment = JSON.parse(localStorage.getItem(`"comments_user"${PRODID}`)) || [];
    myObjarraycomment.forEach(Formularioelement => {
      insertRowEntabla(Formularioelement)
    }
    );
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
  let dateTime = new Date;
  return {
    "product": product,
    "score": score,
    "description": description,
    "user": user,
    "dateTime": dateTime
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
  newCellRef.innerHTML = (` ${Obj_form["user"]}-${(Obj_form["dateTime"])}-${tipo_de_puntuacion(Obj_form["score"])} <br> 
  ${(Obj_form["description"])}`)
}

function tipo_de_puntuacion(score) {
  if (score === 5) {
    return `
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    `
  } if (score === 4) {
    return `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    `
  }
  if (score === 3) {
    return `
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    `
  }
  if (score === 2) {
    return `
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    `
  }
  if (score === 1) {
    return `
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    `
  }
  if (score === 0) {
    return `
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    `
  }
}

