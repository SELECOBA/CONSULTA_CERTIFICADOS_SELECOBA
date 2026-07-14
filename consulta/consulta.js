//=========================================
// CONFIGURACIÓN
//=========================================

const API =
"https://selecoba-api.info-selecoba.workers.dev";


//=========================================
// ELEMENTOS DEL DOM
//=========================================

const txtCodigo =       document.getElementById("codigo");
const txtUsuario =      document.getElementById("usuario");
const txtPassword =     document.getElementById("password");
const btnBuscar =       document.getElementById("btnBuscar");
const btnLogin =        document.getElementById("btnLogin");
const btnInfo =         document.getElementById("btnInfo");
const boxResultado =    document.getElementById("resultado");
const boxLogin =        document.getElementById("login");
const spinner =         document.getElementById("spinner");
const mensajeLogin =    document.getElementById("mensajeLogin");

//=========================================
// EVENTOS
//=========================================

txtCodigo.addEventListener(
"keypress",
function(e){
    if(e.key==="Enter"){
        buscarCertificado();
    }
});

//=========================================
// FUNCIONES AUXILIARES
//=========================================

function mostrarSpinner(valor){
    spinner.style.display=
    valor
    ?"block"
    :"none";
}
function bloquearBoton(boton,texto){
    boton.disabled=true;
    boton.innerHTML=texto;
}
function desbloquearBoton(boton,texto){
    boton.disabled=false;
    boton.innerHTML=texto;
}
function mostrarMensajeLogin(texto){
    mensajeLogin.style.display="block";
    mensajeLogin.innerHTML=texto;
}
function ocultarMensajeLogin(){
    mensajeLogin.style.display="none";
    mensajeLogin.innerHTML="";
}
function mostrarError(texto){
    boxResultado.style.display="block";
    boxResultado.className="error";
    boxResultado.innerHTML=texto;
}
function mostrarLogin(){
    boxLogin.style.display="block";
    ocultarMensajeLogin();
}

//=========================================
// BUSCAR CERTIFICADO
//=========================================

async function buscarCertificado(){
    const codigo=
    txtCodigo.value.trim();
    if(!codigo){
        return;
    }
    bloquearBoton(btnBuscar,"🔄 Buscando...");
    mostrarSpinner(true);
    try{
        const respuesta = await fetch(API+"?accion=buscar&codigo="+encodeURIComponent(codigo));
        const data=
        await respuesta.json();
        mostrarResultado(data);
    }
    catch(error){
        console.error(error);
        mostrarError("Error de conexión con el servidor.");
    }
    finally{
        mostrarSpinner(false);
        desbloquearBoton(btnBuscar,"🔍 Buscar");
    }
}

//=========================================
// MOSTRAR RESULTADO
//=========================================

function mostrarResultado(data){
    boxResultado.style.display="block";
    if(data.encontrado){
        boxResultado.className="ok";
        boxResultado.innerHTML=
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
        btnInfo.style.display="block";
    }
    else{
        boxResultado.className="error";
        boxResultado.innerHTML="❌ Certificado no encontrado";
        btnInfo.style.display="none";
    }
}

//=========================================
// INFORMACIÓN TÉCNICA
//=========================================

async function validarAcceso(){
    ocultarMensajeLogin();
    const datos={
        accion:"info",
        codigo:
        txtCodigo.value.trim(),
        usuario:
        txtUsuario.value.trim(),
        password:
        txtPassword.value.trim()
    };
    if(
        !datos.usuario ||
        !datos.password
    ){
        mostrarMensajeLogin("❌ Ingrese usuario y contraseña.");
        return;
    }
    bloquearBoton(btnLogin,"🔄 Validando..."
    );
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
        const data=
        await respuesta.json();
        if(data.encontrado){
            alert(
            "OBSERVACIONES\n\n"
            +
            data.observaciones
            );
        }
        else{
            mostrarMensajeLogin("❌ Usuario o contraseña incorrectos.");
        }
    }
    catch(error){
        console.error(error);
        mostrarMensajeLogin("❌ Error de conexión con el servidor.");
    }
    finally{
        desbloquearBoton(btnLogin,"Ingresar");
    }
}