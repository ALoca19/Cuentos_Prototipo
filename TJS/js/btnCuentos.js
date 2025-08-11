// Funciones para manejar los cambios de escena
function Cuento01() {
    console.log("Cargando el cuento 01...");
    window.location.href = "../pages/arC01.html";
}

function Cuento02() {
    console.log("Cargando el cuento 02...");
    // Cambiar a la escena del cuento 02
    window.location.href = "../pages/arC02.html"; // Redirige a la página del cuento 02
}

function Cuento03() {
    console.log("Cargando el cuento 03...");
    // Cambiar a la escena del cuento 03
    window.location.href = "../pages/arC03.html"; // Redirige a la página del cuento 03
}

// Evento para la flecha de retroceso
document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.querySelector('.btn-primary');
    if (backButton) {
        backButton.onclick = function() {
            console.log("Regresando a la página anterior...");
            window.history.back(); // Regresa a la página anterior en el historial
        };
    }
});
