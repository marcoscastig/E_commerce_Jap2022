let primerNombre = document.getElementById('primerNombre')
let segundoNombre = document.getElementById('segundoNombre')
let primerApellido = document.getElementById('primerApellido')
let segundoApellido = document.getElementById('segundoApellido')
let email = document.getElementById('email')
let telefono = document.getElementById('telefono')
const formularioPerfil = document.getElementById('formularioPerfil')
let validarInfo = (JSON.parse(localStorage.getItem(`"user_data"${usuario_name}`))) || []
let imagenPerfil = document.getElementById('imagenPerfil')
const inputFile = document.getElementById('formFile');
const traerImagen = (JSON.parse(localStorage.getItem(`"user_image"${usuario_name}`))) || ""

function cargarDatosIniciales (){

    if((validarInfo.nombre === undefined)){

         email.value = usuario_name

    }
        else {
            primerNombre.value = validarInfo.nombre
            segundoNombre.value = validarInfo.segundoNombre
            primerApellido.value = validarInfo.apellido
            segundoApellido.value = validarInfo.segundoApellido
            email.value = usuario_name
            telefono.value = validarInfo.telefono
        }
    }
    
document.addEventListener('DOMContentLoaded', ()=> {

    cargarDatosIniciales()

    cambiarImagenJS()

})

  let usuario_datos =  {
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    email: usuario_name,
    telefono: ""
}

formularioPerfil.addEventListener("submit", (event)=>{
    event.preventDefault()
    
    usuario_datos =  {
        nombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        apellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        email: usuario_name,
        telefono: telefono.value
    }
    
    localStorage.setItem(`"user_data"${usuario_name}`, JSON.stringify(usuario_datos))
   
    localStorage.setItem(`"user_image"${usuario_name}`, JSON.stringify(imagenPerfil.src))

})


function cambiarImagenJS(){
    if(traerImagen !=""){

        imagenPerfil.src = traerImagen

    } else {
        
        imagenPerfil.src ="img/img_perfil.png"

    }

  }


async function encodeFileAsBase64URL(file) {

        return new Promise((resolve) => {

            const reader = new FileReader();

            reader.addEventListener('loadend', () => {

                resolve(reader.result);

            });

            reader.readAsDataURL(file);
            
        });
   };

   inputFile.addEventListener('input', async (event) => {
   
    const base64URL = await encodeFileAsBase64URL(inputFile.files[0]);

    imagenPerfil.setAttribute('src', base64URL);

});


