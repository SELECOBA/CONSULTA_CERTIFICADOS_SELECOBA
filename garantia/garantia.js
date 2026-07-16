/*=========================================
  SELECOBA
  Registro de Garantía
=========================================*/

//=========================================
// API
//=========================================

const API =
"https://selecoba-api.info-selecoba.workers.dev";

//=========================================
// VARIABLES
//=========================================

let datosGarantia = {};

//=========================================
// CARGAR INFORMACIÓN
//=========================================

window.onload=function(){

    const parametros = new URLSearchParams( window.location.search);
datosGarantia.codigo =      parametros.get("codigo") || "";
datosGarantia.cliente =     parametros.get("cliente") || "";
datosGarantia.equipo =      parametros.get("equipo") || "";
datosGarantia.usuario =     parametros.get("usuario") || "";
datosGarantia.nombre =      parametros.get("nombre") || "";
datosGarantia.password =    parametros.get("password") || "";
datosGarantia.cargo =       parametros.get("cargo") || "";

document
.getElementById("codigo")
.value=datosGarantia.codigo;

document
.getElementById("cliente")
.value=datosGarantia.cliente;

document
.getElementById("equipo")
.value=datosGarantia.equipo;

document
.getElementById("tecnico")
.value=datosGarantia.nombre;

document
.getElementById("cargo")
.value=datosGarantia.cargo;
};

//=========================================
// CONFIRMAR REGISTRO
//=========================================

function confirmarGarantia(){

const detalle =
document
.getElementById("detalle")
.value
.trim();

if(detalle==""){
alert("Ingrese la descripción de la garantía.");
return;
}
const confirmar = confirm("¿Registrar la garantía del equipo?\n\nEsta acción actualizará el historial del mantenimiento.");

if(!confirmar){
return;
}

guardarGarantia();
}

//=========================================
// GUARDAR GARANTÍA
//=========================================

async function guardarGarantia(){

const boton=
document
.getElementById("btnGuardar");

const spinner=
document
.getElementById("spinner");
boton.disabled=true;
boton.innerHTML="Guardando...";
spinner.style.display="block";

const datos={
accion:"garantia",
codigo:datosGarantia.codigo,
usuario:datosGarantia.usuario,
password:datosGarantia.password,
nombre:datosGarantia.nombre,
cargo:datosGarantia.cargo,
detalle:
document
.getElementById("detalle")
.value
};

try{
const respuesta=
await fetch(
API,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(datos)
}
);
const resultado=
await respuesta.json();
if(resultado.encontrado){
alert("✅ Garantía registrada correctamente.");
window.location.href="../consulta/consulta.html";
}

else{
alert(resultado.mensaje);
}
}

catch(error){
console.error(error);
alert("Error de conexión con el servidor.");
}

finally{
spinner.style.display="none";
boton.disabled=false;
boton.innerHTML=
"🛠 Registrar garantía";
}
}

//=========================================
// CANCELAR
//=========================================

function volverConsulta(){

history.back();
}