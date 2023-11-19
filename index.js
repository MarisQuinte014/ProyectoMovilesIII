require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?retryWrites=true&w=majority/${DB_NAME}`;

// CONEXIÓN A BASE DE DATOS
//mongodb://localhost:27017/myapp'
//mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
let db = "dbtienda"
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(db => console.log("Conexión a BD exitosa"))
    .catch(error => console.log("Error al conectarse a la BD" + error));



// MIDDLEWARE
app.use(cors());            // Soporte para CORS
app.use(express.json());    // IMPORTANTE: Poner esto antes de las rutas
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// SERVIDOR WEB
app.listen(PORT, () => console.log("Servidor iniciado..."));
