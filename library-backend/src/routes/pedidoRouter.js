const { Router } = require("express");
const router = Router();

router.get("/", pedidoController.getAll);
router.get("/:id", pedidoController.getOne);
router.post("/pedidobycliente/", pedidoController.getByCliente);
router.post("/", pedidoController.insertPedido);
router.post("/byquery/", pedidoController.getByQuery);
router.put("/:id", pedidoController.updatePedido);
router.delete("/:id", pedidoController.deletePedido);

module.exports = router;