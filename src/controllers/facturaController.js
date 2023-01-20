const { request, response } = require("express");
const Factura = require('../model/factura');
const User = require('../model/user');

const getAll = async (req, res = response) => {
    try {
        const factura = await Factura.find({}).populate({ path: "user", populate: { path: "User" } })
            .populate({ path: "pedido", populate: { path: "Order" } }).exec();

        res.status(200).json(factura);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const getOne = async (req, res = response) => {
    try {
        const factura = await FacturafindById(req.params.id);

        if (!factura) {
            return res.status(404).json({
                ok: false,
                msg: "El factura no existe"
            });
        }

        res.status(200).json(factura);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const insertFactura = async (req, res = response) => {

    const cantFact = await Factura.find({})
    const user = await User.findOne({ email: req.body.user });

    try {

        const factura = {
            fecha: Date.now(),
            numero: cantFact.length,
            total: req.body.total,
            pedido: req.body._id,
            user: user._id,
        }

        const fact = new Factura(factura);
        const saveFactura = await fact.save();
        res.status(201).json({ msg: 'Factura creada con exito', fact: saveFactura });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};


module.exports = {
    getAll,
    getOne,
    insertFactura,
}