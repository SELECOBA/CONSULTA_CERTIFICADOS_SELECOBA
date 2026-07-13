const API =

"https://selecoba-api.info-selecoba.workers.dev";





let sesion={

usuario:"",

nombre:"",

cargo:""

};






async function iniciarSesion(){



const usuario =

document
.getElementById("usuario")
.value.trim();



const password =

document
.getElementById("password")
.value.trim();




if(!usuario || !password){

alert("Ingrese usuario y contraseña");

return;

}





try{



const respuesta =

await fetch(

API,

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},


body:JSON.stringify({

accion:"login",

usuario:usuario,

password:password

})


}

);



const data=

await respuesta.json();




if(data.encontrado){



sesion.usuario=data.usuario;

sesion.nombre=data.nombre;

sesion.cargo=data.cargo;





document

.getElementById("loginBox")

.style.display="none";




document

.getElementById("formulario")

.style.display="block";




document

.getElementById("usuarioActivo")

.innerHTML=

`

Usuario:

<b>${sesion.nombre}</b>

<br>

Cargo:

${sesion.cargo}

`;



}

else{


alert(data.mensaje);


}



}

catch(error){

console.error(error);

alert(
error.message
);

}


}









async function registrar(){



if(!sesion.usuario){


alert(
"Debe iniciar sesión"
);


return;


}




const datos={



accion:"registrar",


cliente:
document.getElementById("cliente").value.trim(),



oc:
document.getElementById("oc").value.trim(),



equipo:
document.getElementById("equipo").value.trim(),



tipo:
document.getElementById("tipo").value,



observaciones:
document.getElementById("observaciones").value.trim(),



usuario:
sesion.usuario,


nombre:
sesion.nombre



};






// VALIDAR CAMPOS OBLIGATORIOS


if(


!datos.cliente ||

!datos.oc ||

!datos.equipo


){


alert(
"Complete los campos obligatorios"
);


return;


}






// VALIDAR ORDEN DE COMPRA SOLO NUMEROS


if(!/^[0-9]+$/.test(datos.oc)){


alert(
"La orden de compra solo debe contener números"
);


return;


}






document
.getElementById("spinner")
.style.display="block";






try{


const respuesta =

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






const resultado =

await respuesta.json();






if(resultado.encontrado){



alert(

"Registro creado correctamente\n\nCódigo:\n"

+

resultado.codigo

);



limpiar();



}

else{


alert(resultado.mensaje);



}



}

catch(error){


console.error(error);


alert(

"Error al registrar"

);



}



finally{


document

.getElementById("spinner")

.style.display="none";


}



}








function limpiar(){


document.getElementById("cliente").value="";

document.getElementById("oc").value="";

document.getElementById("equipo").value="";

document.getElementById("tipo").selectedIndex=0;

document.getElementById("observaciones").value="";


}
