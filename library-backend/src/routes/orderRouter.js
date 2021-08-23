const { Router } = require("express");
const router = Router();
const {
    getAllOrders,
    getOneOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    feedback
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.get("/:id", getOneOrder);
router.post("/", insertOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/feedback",feedback);

module.exports = router;