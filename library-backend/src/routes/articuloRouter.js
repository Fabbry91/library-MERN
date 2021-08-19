const { Router } = require("express");
const router = Router();
const {
    getOne,
    getAll,
    insertArticulo,
    updateArticulo,
    deleteArticulo,
    decreaseStock
} = require('../controllers/articuloCotroller');

router.get("/", getAll);
router.get("/:id", getOne);
//router.post("/decreasestock", decreaseStockArticulo);
router.post("/",insertArticulo);
router.put("/:id", updateArticulo);
router.delete("/:id", deleteArticulo);
router.post("/cart", decreaseStock);

module.exports = router;