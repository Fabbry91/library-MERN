const { Schema, model, Types } = require("mongoose");

const facturaSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fecha: { type: Date, required: true },
    numero: { type: Number, required: true },
    total: { type: Number, required: true },
    pedido: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
});

// con decimal 128 obtengo un objeto json que no es correcto y lo transformo como set

/*facturaSchema.set("toJSON", {
    transform: (doc, fact) => {
        fact.total = parseFloat(fact.total);
    }
})*/



module.exports = model("Factura", facturaSchema);