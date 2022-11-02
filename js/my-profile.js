let primerNombre = document.getElementById('primerNombre')
let segundoNombre = document.getElementById('segundoNombre')
let primerApellido = document.getElementById('primerApellido')
let segundoApellido = document.getElementById('segundoApellido')
let email = document.getElementById('email')
let telefono = document.getElementById('telefono')
const formularioPerfil = document.getElementById('formularioPerfil')
let validarInfo = (JSON.parse(localStorage.getItem(`"user_data"${usuario_name}`))) || []

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
    validarDatos()
    

})

function validarDatos(){
    
    

}
validarDatos()



/*
primerNombre.value = usuario_datos.nombre
    segundoNombre.value = usuario_datos.segundoNombre
    primerApellido.value = usuario_datos.apellido
    segundoApellido.value = usuario_datos.segundoApellido
    email = usuario_name
    telefono.value = usuario_datos.telefono
    */