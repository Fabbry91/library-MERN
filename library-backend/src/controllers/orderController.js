const { request, response } = require("express");
const mercadopago = require("mercadopago");
const Articulo = require('../model/articulo');
const Order = require('../model/order');

const getAllOrders = async (req, res = response) => {
    try {
        const orders = await Order.find({});

        res.status(200).json(orders);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const getOneOrder = async (req, res = response) => {
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({
                ok: false,
                msg: "El articulo no existe"
            });
        }

        res.status(200).json(articulo);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const getOrderByEmail = async (req, res = response) => {
    //console.log(req.params.email)
    try {
        const order = await Order.find({ email: req.params.id });
        if (!order) {
            return res.status(404).json({
                ok: false,
                msg: "El email no existe en ordenes"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const updateOrder = async (req, res = response) => {
    const articuloId = req.params.id;
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({
                ok: false,
                msg: "El articulo no existe"
            });
        }

        const nuevoArticulo = {
            ...req.body,
        }

        const articuloActualizado = await Articulo.findByIdAndUpdate(articuloId, nuevoArticulo, { new: true });

        res.status(200).json(articuloActualizado);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const deleteOrder = async (req, res = response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                ok: false,
                msg: "La orden no existe"
            });
        }
        //console.log(order)
        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Orden eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const insertOrder = async (req, res = response) => {

    try {
        const { items, user, total } = req.body;
        //console.log(items);
        const repuesta = items.map(p => { return { ...p, stock: p.stock - p.qty } })
        //console.log(repuesta)
        const arts = repuesta.map(p => { return { title: p.nameArticulo, unit_price: p.precioVenta, quantity: p.qty } })
        //console.log(arts)
        const artOrder = repuesta.map(p => { return { title: p.nameArticulo, unit_price: p.precioVenta, quantity: p.qty, product: p.producto } })

        for (const q of repuesta) {
            if (q.stock < 0) {
                res.status(400).json({
                    msg: 'sin stock',
                })
            }
        }
        const preference = {
            items: arts,
            back_urls: {
                success: `http://localhost:4000/api/feedback`,
                failure: `http://localhost:4000/api/feedback`,
                pending: `http://localhost:4000/api/feedback`,
            },
            auto_return: "approved",
        }
        const resp = await mercadopago.preferences.create(preference)

        const orden = {
            user: user,
            preferenceId: resp.body.id,
            date: Date.now(),
            status: "pending",
            items: artOrder,
            total: total
        }

        //console.log(orden)

        const order = new Order(orden);
        const saveOrder = await order.save();
        //console.log(saveOrder)

        res.status(201).json(saveOrder);
    } catch {
        res.status(404);
    }
};

const feedback = (req, res = response) => {

    res.json({
        Status: req.query.status
    })

};


module.exports = {
    getAllOrders,
    getOneOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    getOrderByEmail,
    feedback
}