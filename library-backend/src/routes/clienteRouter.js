const { Router } = require("express");
const router = Router();

router.get("/", clienteController.getAll);
router.get("/:id", clienteController.getOne);
router.get("/byemail/:email", clienteController.getClientByEmail);
router.post("/byquery/", clienteController.getClientByQuery);
router.post("/", clienteController.insertCliente);
router.put("/:id", clienteController.updateCliente);
router.delete("/:id", clienteController.deleteCliente);

module.exports = router;