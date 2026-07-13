const API =

"https://selecoba-api.info-selecoba.workers.dev";




// ENTER PARA BUSCAR

document

.getElementById("codigo")

.addEventListener(

"keypress",

function(e){


if(e.key==="Enter"){


buscarCertificado();


}


}

);





async function buscarCertificado(){



const codigo =

document

.getElementById("codigo")

.value

.trim();




if(!codigo)

return;




mostrarSpinner(true);



try{


const respuesta =

await fetch(

API+

"?accion=buscar&codigo="+

encodeURIComponent(codigo)

);



const data =

await respuesta.json();




mostrarResultado(data);



}

catch(error){


mostrarError(

"Error de conexión con el servidor"

);



}

finally{


mostrarSpinner(false);


}



}







function mostrarResultado(data){



const box =

document

.getElementById("resultado");



box.style.display="block";



if(data.encontrado){



box.className="ok";



box.innerHTML=


`

<h3>

✔ Certificado encontrado

</h3>


<b>Código:</b>

${data.codigo}

<br><br>


<b>Cliente:</b>

${data.cliente}

<br><br>


<b>Equipo:</b>

${data.equipo}

<br><br>


<b>Fecha mantenimiento:</b>

${data.fecha}

<br><br>


<b>Próximo mantenimiento:</b>

${data.proximo}


`;



document

.getElementById("btnInfo")

.style.display="block";



}

else{


box.className="error";


box.innerHTML=

`

❌ Certificado no encontrado

`;



document

.getElementById("btnInfo")

.style.display="none";


}



}






function mostrarSpinner(valor){


document

.getElementById("spinner")

.style.display=

valor

?"block"

:"none";


}






function mostrarError(texto){



const box=

document

.getElementById("resultado");



box.style.display="block";

box.className="error";

box.innerHTML=texto;


}






function mostrarLogin(){



document

.getElementById("login")

.style.display="block";


}








async function validarAcceso(){



const codigo =

document

.getElementById("codigo")

.value;



const usuario =

document

.getElementById("usuario")

.value;



const password =

document

.getElementById("password")

.value;





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

accion:"info",

codigo:codigo,

usuario:usuario,

password:password


})

}


);



const data=

await respuesta.json();



if(data.encontrado){



alert(

"OBSERVACIONES:\n\n"

+

data.observaciones

);



}

else{


alert(data.mensaje);



}




}

catch(error){


alert(

"Error de conexión"

);


}



}