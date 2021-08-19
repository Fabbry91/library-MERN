const { Router } = require('express');
const router = Router();

router.get("/", facturaController.getAll);
router.get("/:id", facturaController.getOne);
router.post("/byquery/", facturaController.getByQuery);
router.post("/", facturaController.insertFactura)

module.exports = router;