const { request, response } = require("express");
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

        if (Object.keys(req.body.url).length === 0) {
            //console.log('entro')            
            const articuloActualizado = await Articulo.findOneAndUpdate({ _id: articuloId }, {
                $set: {
                    description: req.body.description,
                    nameArticulo: req.body.nameArticulo,
                    precioCompra: req.body.precioCompra,
                    precioVenta: req.body.precioVenta,
                    rubros: req.body.rubros,
                    stock: req.body.stock,
                }
            }, { new: true });

            res.status(200).json(articuloActualizado);

        } else {
            //console.log('no entro')
            const nuevoArticulo = {
                ...req.body,
            }
            const articuloActualizado = await Articulo.findByIdAndUpdate(articuloId, nuevoArticulo, { new: true });
            res.status(200).json(articuloActualizado);
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const deleteArticulo = async (req, res = response) => {
    const id = req.params.id;
    try {
        const articulo = await Articulo.findById(id);
        //console.log(articulo)
        if (!articulo) {
            return res.status(404).json({
                ok: false,
                msg: "El articulo no existe"
            });
        }
        await Articulo.findByIdAndDelete(id);

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
}