const { Router } = require("express");
const router = Router();
const {
    getAllKits,
    getOneKit,
    insertKit,
    updateKit,
    deleteKit
} = require("../controllers/kitControllers");

router.get("/", getAllKits);
router.get("/:id", getOneKit);
router.post("/", insertKit);
router.put("/:id", updateKit);
router.delete("/:id", deleteKit);

module.exports = router;