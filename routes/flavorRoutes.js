const express = require("express");

const {
    getFlavors,
    getFlavorById,
    createFlavor,
    updateFlavor,
    deleteFlavor
} = require("../controllers/flavorController");

const router = express.Router();

router.get("/", getFlavors);
router.get("/:id", getFlavorById);
router.post("/", createFlavor);
router.put("/:id", updateFlavor);
router.delete("/:id", deleteFlavor);

module.exports = router;