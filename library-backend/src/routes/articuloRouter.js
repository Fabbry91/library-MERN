const { Router } = require("express");
const router = Router();
const {
    getOne,
    getAll,
    insertArticulo,
    updateArticulo,
    deleteArticulo,
} = require('../controllers/articuloCotroller');

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/",insertArticulo);
router.put("/:id", updateArticulo);
router.delete("/:id", deleteArticulo);

module.exports = router;