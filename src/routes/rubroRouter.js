const { Router } = require("express");
const router = Router();
const {
    insertRubro,
    getAll,
    getOne,
    deleteRubro
} = require("../controllers/rubroController");

router.get("/", getAll);
router.post("/", insertRubro);

router.get("/:id", getOne);
router.delete("/:id", deleteRubro);

module.exports = router;