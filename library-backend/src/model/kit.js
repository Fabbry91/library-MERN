const { Schema, model, Types } = require("mongoose");

const kitSchema = new Schema({
    nameKit: { type: String, required: true },
    precioKit: { type: Types.Decimal128, required: true },
    details: [
        {
            cantidad: { type: Types.Decimal128, required: true },
            articulo: { type: Types.ObjectId, ref: "articulo" }
        }
    ]
});

// con decimal 128 obtengo un objeto json que no es correcto y lo transformo como set

kitSchema.set("toJSON", {
    transform: (doc, kit) => {
        kit.precioKit = parseFloat(kit.precioKit);
        kit.details = kit.details.map(d => {
            return { cantidad: parseFloat(d.cantidad), articulo: d.articulo };
        });
    }
})



module.exports = model("Kit", kitSchema);