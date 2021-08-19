const { request, response } = require("express");
const Kit = require('../model/kit');

const getAllKits = async (req, res = response) => {
    try {
        const kits = await Kit.find({});

        res.status(200).json(kits);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const getOneKit = async (req, res = response) => {
    try {
        const kitOne = await Kit.findById(req.params.id);

        if (!kitOne) {
            return res.status(404).json({
                ok: false,
                msg: "El Kit no existe"
            });
        }
        const { id, nameKit } = kitOne;
        res.status(200).json({ id, nameKit });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const insertKit = async (req, res = response) => {

    try {

        const newKit = new Kit(req.body);
        const saveKit = await newKit.save();
        res.status(201).json(saveKit);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const updateKit = async (req, res = response) => {
    const kitId = req.params.id;
    try {
        const kitUpdate = await Kit.findById(req.params.id);
        if (!kitUpdate) {
            return res.status(404).json({
                ok: false,
                msg: "El Kit no existe"
            });
        }

        const nuevoKit = {
            ...req.body,
        }

        const kitActualizado = await Kit.findByIdAndUpdate(kitId, nuevoKit, { new: true });

        res.status(200).json(kitActualizado);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const deleteKit = async (req, res = response) => {
    try {
        const kit = await Kit.findById(req.params.id);
        if (!kit) {
            return res.status(404).json({
                ok: false,
                msg: "El kit no existe"
            });
        }
        await Kit.findOneAndDelete(req.params.id);

        res.status(200).json({ msg: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

/*const decreaseStockArticulo = async (req, res = response) => {
    const queries = req.body;
    try {
        for (const q of queries) {
            await Articulo.findOneAndUpdate({ _id: q._id }, { $inc: { stock : -q.cantidad} })
        }
    } catch (error) {

    }
}*/

module.exports = {
    getAllKits,
    getOneKit,
    insertKit,
    updateKit,
    deleteKit
}