const { Schema, model, Types } = require("mongoose");

const orderItem = new Schema({
    title: { type: String, required: true },
    unit_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const orderSchema = new Schema({
    user: { type: String, required: true },
    preferenceId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    total: { type: Number, required: true },
    items: [orderItem],
});

// con decimal 128 obtengo un objeto json que no es correcto y lo transformo como set

orderItem.set("toJSON", {
    transform: (doc, art) => {
        art.precioVenta = parseFloat(art.precioVenta);
    }
})



module.exports = model("Order", orderSchema);