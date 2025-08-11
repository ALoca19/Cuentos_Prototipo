document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const nombre = document.querySelector("#nombre").value;
    const edad = document.querySelector("#edad").value;
    const escuela = document.querySelector("#escuela").value;
    const grado = document.querySelector("#grado").value;

    // Obtener el ID del cuento desde la URL
    const params = new URLSearchParams(window.location.search);
    const idCuento = params.get("id");

    const respuestas = [];

    // Procesa las preguntas cerradas (radio buttons)
const radioGroups = new Set(); // Usamos un Set para obtener los grupos únicos por "name"

// Recorremos todos los radio buttons para identificar sus grupos
document.querySelectorAll("input[type='radio']").forEach((input) => {
    radioGroups.add(input.name);
});

// Procesamos cada grupo
radioGroups.forEach((groupName) => {
    const checkedOption = document.querySelector(`input[name="${groupName}"]:checked`);
    respuestas.push(checkedOption ? checkedOption.value : ""); // Si no hay selección, agrega "N"
});

// Procesa las preguntas abiertas (text inputs)
document.querySelectorAll("input[type='text']").forEach((input) => {
    if (input.id.startsWith("pregunta")) {
        // Guarda la respuesta abierta, o "N" si está vacío
        respuestas.push(input.value.trim() || "");
    }
});

    // Enviar los datos al backend
    try {
        const respuesta = await fetch("http://localhost:3000/guardar-respuestas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, edad, escuela, grado, idCuento, respuestas }),
        });

        if (respuesta.ok) {
            alert("Respuestas guardadas correctamente");
            window.location.href = "../index.html"; // Redirige a la página principal
        } else {
            const error = await respuesta.text();
            console.error("Error del servidor:", error);
            alert("Error al guardar respuestas: " + error);
        }
    } catch (error) {
        console.error("Error al enviar respuestas:", error);
        alert("Error de conexión al guardar respuestas");
    }
});
