const { Router } = require('express');
const router = Router();

const {
    getOne,
    getAll,
    insertFactura,
} = require('../controllers/facturaController');

router.get("/",getAll);
router.get("/:id",getOne);
router.post("/",insertFactura)

module.exports = router;