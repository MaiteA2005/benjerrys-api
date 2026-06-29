const express = require("express");

const {
    getToppings,
    getToppingById,
    createTopping,
    updateTopping,
    deleteTopping
} = require("../controllers/toppingController");

const router = express.Router();

router.get("/", getToppings);
router.get("/:id", getToppingById);
router.post("/", createTopping);
router.put("/:id", updateTopping);
router.delete("/:id", deleteTopping);

module.exports = router;