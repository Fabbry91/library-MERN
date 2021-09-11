const { request, response } = require("express");
const Rubro = require('../model/rubro');

const getAll = async (req, res = response) => {
    try {
        const rubros = await Rubro.find({});

        res.status(200).json(rubros);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const getOne = async (req, res = response) => {
    try {
        const rubro = await Rubro.findById(req.params.id);
        if (!rubro) {
            return res.status(404).json({
                ok: false,
                msg: "El articulo no existe"
            });
        }
        const { id, nameRubro } = rubro;
        res.status(200).json({ id, nameRubro });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const insertRubro = async (req, res = response) => {
    const rubro = new Rubro(req.body);
    try {
        const rubro = new Rubro(req.body);
        const saveRubro = await rubro.save();
        res.status(201).json({ msg: 'Creado exitosamente', rubro: saveRubro });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};
const deleteRubro = async (req, res = response) => {
    try {
        const rubro = await Rubro.findById(req.params.id);
        if (!rubro) {
            return res.status(404).json({
                ok: false,
                msg: "El articulo no existe"
            });
        }
        await Rubro.findByIdAndDelete(req.params.id);

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
    insertRubro,
    deleteRubro
}