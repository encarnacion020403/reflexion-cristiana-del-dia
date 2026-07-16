// ===============================
// REFLEXIÓN CRISTIANA DEL DÍA
// script.js
// ===============================

let indiceActual = 0;
// Devuelve un número según el día del año
function obtenerDiaDelAnio() {

    const hoy = new Date();

    const inicio = new Date(hoy.getFullYear(), 0, 0);

    const diferencia = hoy - inicio;

    const unDia = 1000 * 60 * 60 * 24;

    return Math.floor(diferencia / unDia);

}

// Mostrar una reflexión por índice
function mostrar(indice){

    indiceActual = indice;

    document.getElementById("referencia").textContent =
    reflexiones[indice].referencia;

    document.getElementById("versiculo").textContent =
    reflexiones[indice].versiculo;

    document.getElementById("reflexion").textContent =
    reflexiones[indice].reflexion;

}

// Al cargar la página
window.onload = function(){

    let dia = obtenerDiaDelAnio();

    indiceActual = dia % reflexiones.length;

    mostrar(indiceActual);

}

// ===========================
// BOTÓN OTRA REFLEXIÓN
// ===========================

document.getElementById("otraReflexion").addEventListener("click",function(){

    let nuevo;

    do{

        nuevo = Math.floor(Math.random()*reflexiones.length);

    }while(nuevo===indiceActual && reflexiones.length>1);

    mostrar(nuevo);

});

// ===========================
// GUARDAR FAVORITA
// ===========================

document.getElementById("favorito").addEventListener("click",function(){

   // Obtener las favoritas guardadas
let favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];

// Reflexión actual
let nuevaFavorita = reflexiones[indiceActual];

// Verificar si ya existe
let existe = favoritas.some(f =>
    f.referencia === nuevaFavorita.referencia
);

if (existe) {

    alert("⭐ Esta reflexión ya está en tus favoritos.");

} else {

    favoritas.push(nuevaFavorita);

    localStorage.setItem(
        "favoritas",
        JSON.stringify(favoritas)
    );

    alert("✅ Reflexión guardada en favoritos.");

}

});

// ===========================
// COMPARTIR
// ===========================

document.getElementById("compartir").addEventListener("click",function(){

    let texto =

    reflexiones[indiceActual].referencia +

    "\n\n" +

    reflexiones[indiceActual].versiculo +

    "\n\n" +

    reflexiones[indiceActual].reflexion;

    if(navigator.share){

        navigator.share({

            title:"Reflexión Cristiana",

            text:texto

        });

    }else{

        navigator.clipboard.writeText(texto);

        alert("📋 Reflexión copiada al portapapeles.");

    }

});
// ===========================
// MODO OSCURO
// ===========================

const botonModoOscuro = document.getElementById("modoOscuro");

if (botonModoOscuro) {

    // Si el usuario ya había activado el modo oscuro
    if (localStorage.getItem("modoOscuro") === "activo") {

        document.body.classList.add("oscuro");
        botonModoOscuro.textContent = "☀️";

    }

    botonModoOscuro.addEventListener("click", function () {

        document.body.classList.toggle("oscuro");

        if (document.body.classList.contains("oscuro")) {

            localStorage.setItem("modoOscuro", "activo");
            botonModoOscuro.textContent = "☀️";

        } else {

            localStorage.removeItem("modoOscuro");
            botonModoOscuro.textContent = "🌙";

        }

    });

}// ===============================
// EMAILJS - FORMULARIO DE CONTACTO
// ===============================

// Inicializar EmailJS
emailjs.init({
    publicKey:  "Ukma0fMo17KPmBrCy"
});

const formulario = document.getElementById("formContacto");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        const estado = document.getElementById("estadoEnvio");

        estado.textContent = "Enviando mensaje...";

        emailjs.send(

            "encarnacion020403",

            "template_w60rfwg",

            {
                name: document.getElementById("nombre").value,
                email: document.getElementById("email").value,
                asunto: document.getElementById("asunto").value,
                message: document.getElementById("mensaje").value
            }

        ).then(function () {

            estado.style.color = "green";
            estado.textContent = "✅ Mensaje enviado correctamente.";

            formulario.reset();

        }).catch(function (error) {

            console.error(error);

            estado.style.color = "red";
            estado.textContent = "❌ Error al enviar el mensaje.";

        });

    });

}