const { request, response } = require("express");
const User = require('../model/user');

const getAll = async (req, res = response) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const getOne = async (req, res = response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El user no existe"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const getbyEmail = async (req, res = response) => {
    //console.log(req.params)

    try {

        const user = await User.findOne(req.params);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El user no existe"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const insertUsuario = async (req, res = response) => {

    const user = new User(req.body);

    try {

        if (user.tipo == 0) {
            user.tipo = ["cliente"];
            const saveuser = await user.save();
            console.log(saveuser);
            res.status(201).json(saveuser);
        } else {

            const saveuser = await user.save();
            console.log(saveuser);
            res.status(201).json(saveuser);
        }

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
};

const updateUsuario = async (req, res = response) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El user no existe"
            });
        }
        const userActualizado = await User.findByIdAndUpdate(userId, {
            $set: {
                apellido:req.body.apellido,
                nombre:req.body.nombre,
                telefono:req.body.telefono,
                tipo:req.body.tipo,
                email:req.body.email,
                domicilio: {
                    localidad:req.body.domicilio.localidad,
                    calle:req.body.domicilio.calle,
                    numero:req.body.domicilio.numero,
                    cp:req.body.domicilio.cp,
                    provincia:req.body.domicilio.provincia,
                }
            }
        }, { new: true });

        res.status(200).json(userActualizado);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const updateUserByEmail = async (req, res = response) => {
    const userEmail = req.params.email;
    //console.log(user)
    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El user no existe"
            });
        }
        const userActualizado = await User.findOneAndUpdate({ email: userEmail }, {
            $set: {
                telefono: req.body.telefono,
                domicilio: {
                    calle: req.body.calle,
                    numero: req.body.numero,
                    cp: req.body.cp,
                    localidad: req.body.localidad,
                    provincia: req.body.provincia
                }
            }
        }, { new: true });

        res.status(200).json(userActualizado);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
};

const deleteUsuario = async (req, res = response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El user no existe"
            });
        }
        await User.findOneAndDelete(req.params.id);

        res.status(200).json({ msg: 'user eliminado exitosamente' });
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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    getbyEmail,
    updateUserByEmail
}