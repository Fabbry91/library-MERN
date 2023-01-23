const { Router } = require("express");
const router = Router();

const {
    getAll,
    getOne,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    getbyEmail,
    updateUserByEmail
} = require("../controllers/userCotroller");


router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", insertUsuario);
router.get("/email/:email", getbyEmail);
router.put("/email/:email", updateUserByEmail);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;