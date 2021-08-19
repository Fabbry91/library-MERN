const { Schema, model, Types } = require("mongoose");

const user = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    creacion: { type: Date },
    tipo: { type: [String], required: true },
    domicilio: {
        calle: { type: String, required: true },
        numero: { type: String },
        localidad: { type: String, required: true },
        ciudad: { type: String, required: true },
    }    
});


module.exports = model("User", user);