const { request, response } = require("express");
const mercadopago = require("mercadopago");
const Articulo = require('../model/articulo');
const Order = require("../model/order");

const getFeedback = async (req, res = response) => {
    try {
        const payment = await mercadopago.payment.findById(req.query.payment_id);
        const merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
        const preferenceId = merchantOrder.body.preference_id;
        const status = payment.body.status;

        if (status === "approved") {

            const orden = await Order.findOneAndUpdate({ preferenceId: preferenceId }, { status: status });

            const { items } = orden;
            items.forEach(async (i) => {
                const articulos = await Articulo.findById(i.product);
                await Articulo.findByIdAndUpdate(i.product, { stock: articulos.stock - i.quantity })
            })

        } else {
            res.status(400).json({
                ok: false,
                msg: status,
            });
        }

        res.status(200).json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

module.exports = {
    getFeedback
}