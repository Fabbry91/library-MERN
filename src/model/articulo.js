const { Schema, model, Types } = require("mongoose");

const articuloSchema = new Schema({
    nameArticulo: { type: String, required: true },
    precioCompra: { type: Types.Decimal128, required: true },
    precioVenta: { type: Types.Decimal128, required: true },
    url: { type: String },
    stock: { type: Number, required: true },
    description: { type: String },
    rubros: { type: String, required: true },
});

// con decimal 128 obtengo un objeto json que no es correcto y lo transformo como set

articuloSchema.set("toJSON", {
    transform: (doc, art) => {
        art.precioCompra = parseFloat(art.precioCompra);
        art.precioVenta = parseFloat(art.precioVenta);
        art.precioXmayor = parseFloat(art.precioXmayor);
    }
})



module.exports = model("Articulo", articuloSchema);