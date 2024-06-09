const express = require('express');
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");


// Configuración inicial
const app = express();
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors({
    origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500", ]
}))
app.use(morgan("dev"));

// Rutas
app.get("/productos", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const result = await connection.query("SELECT * FROM producto");
        res.json(result);  // Enviar resultado como JSON
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error al obtener productos");
    }
});


// Iniciar servidor
app.listen(app.get("port"), () => {
    console.log("Escuchando en el puerto " + app.get("port"));
});



