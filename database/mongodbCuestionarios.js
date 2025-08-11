import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getConnection } from "./coneccionMongoDB.js"; // Ruta relativa a coneccionMongoDB.js

// Configuración para obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Servir archivos estáticos desde la carpeta "pages"
app.use(express.static(path.join(__dirname, "../pages")));
app.use(express.static(path.join(__dirname, "../../cuentos")));


// Ruta para guardar las respuestas del cuestionario
app.post("/guardar-respuestas", async (req, res) => {
    try {
        const db = await getConnection();
        const { nombre, edad, escuela, grado, idCuento, respuestas } = req.body;

        if (!nombre || !edad || !escuela || !grado || !idCuento || !respuestas) {
            console.error("Faltan datos en el cuerpo de la solicitud:", req.body);
            return res.status(400).send("Faltan datos requeridos.");
        }

        const alumnosCollection = db.collection("alumnos");

        const nuevoAlumno = {
            Nombre: nombre,
            Edad: edad,
            Escuela: escuela,
            Grado: grado,
            respuestas: {
                [idCuento]: respuestas,
            },
        };

        await alumnosCollection.insertOne(nuevoAlumno);
        res.status(201).send("Nuevo alumno añadido con respuestas.");

        // Busca al alumno por su nombre, escuela y grado
        /*
        const alumno = await alumnosCollection.findOne({ Nombre: nombre, Escuela: escuela, Grado: grado });

        if (alumno) {
            // Si el alumno ya existe, actualiza las respuestas bajo el ID del cuento
            const existingResponses = alumno.respuestas[idCuento] || [];
            const newResponses = respuestas.map((r, i) => existingResponses[i] || r); // Evitar duplicados y mantener estructura

            const updatedResponses = { ...alumno.respuestas, [idCuento]: newResponses };

            await alumnosCollection.updateOne(
                { Nombre: nombre, Escuela: escuela, Grado: grado },
                {
                    $set: { Edad: edad, respuestas: updatedResponses },
                }
            );
            res.status(200).send("Respuestas actualizadas para el alumno existente.");
        } else {
            // Si el alumno no existe, crea un nuevo documento
            const nuevoAlumno = {
                Nombre: nombre,
                Edad: edad,
                Escuela: escuela,
                Grado: grado,
                respuestas: {
                    [idCuento]: respuestas,
                },
            };

            await alumnosCollection.insertOne(nuevoAlumno);
            res.status(201).send("Nuevo alumno añadido con respuestas.");
        }
        */
    } catch (error) {
        console.error("Error al guardar respuestas:", error);
        res.status(500).send("Error al guardar respuestas.");
    }
});





// Ruta principal para el cuestionario
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/cuestionario.html"));
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
