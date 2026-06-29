const express = require("express");

const {
    getIceCreamBases,
    getIceCreamBaseById,
    createIceCreamBase,
    updateIceCreamBase,
    deleteIceCreamBase
} = require("../controllers/iceCreamBaseController");

const router = express.Router();

router.get("/", getIceCreamBases);
router.get("/:id", getIceCreamBaseById);
router.post("/", createIceCreamBase);
router.put("/:id", updateIceCreamBase);
router.delete("/:id", deleteIceCreamBase);

module.exports = router;