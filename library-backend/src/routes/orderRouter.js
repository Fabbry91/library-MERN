const { Router } = require("express");
const router = Router();
const {
    getAllOrders,
    getOneOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    getOrderByEmail,
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.get("/:id", getOneOrder);
router.get("/email/:email", getOrderByEmail);
router.post("/", insertOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;