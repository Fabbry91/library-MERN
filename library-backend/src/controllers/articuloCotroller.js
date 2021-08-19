const { request, response } = require("express");
const mercadopago = require("mercadopago");
const Articulo = require('../model/articulo');

const getAll = async (req, res = response) => {
    try {
        const articulos = await Articulo.find({});

        res.status(200).json(articulos);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const getOne = async (req, res = response) => {
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

const insertArticulo = async (req, res = response) => {

    try {

        const articulo = new Articulo(req.body);
        const saveArticulo = await articulo.save();
        res.status(201).json(saveArticulo);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const updateArticulo = async (req, res = response) => {
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

const deleteArticulo = async (req, res = response) => {
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({
                ok: false,
                msg: "El articulo no existe"
            });
        }
        await Articulo.findOneAndDelete(req.params.id);

        res.status(200).json({ msg: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const decreaseStock = async (req, res = response) => {

    copyArt = req.body;

    const repuesta = copyArt.map(p => { return { ...p, stock: p.stock - p.qty } })
    const arts = repuesta.map(p => { return { title: p.nameArticulo, unit_price: p.precioVenta, quantity: p.qty } })
    try {
        for (const q of repuesta) {
            if (q.stock > 0) {
                await Articulo.findOneAndUpdate({ _id: q._id }, { stock: q.stock })
            } else {
                return (
                    res.status(400).json({
                        msg: 'sin stock',
                    })
                )
            }
        }

        let preference = {
            items: arts,
            back_urls: {
                success: "http://localhost:3000/",
                failure: "http://localhost:3000/",
                pending: "http://localhost:3000/",
            },
            auto_return: "approved",
        }

        const resp = await mercadopago.preferences.create(preference)
        const preferenceId = resp.body.id;
        console.log(preferenceId)
        res.status(200).json({
            preferenceId
        });
    } catch {
        res.status(404);
    }

}

const respontPay = async (req, res = response) => {
    try {

        res.status(200).json({ msg: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

module.exports = {
    getAll,
    getOne,
    insertArticulo,
    updateArticulo,
    deleteArticulo,
    decreaseStock
}