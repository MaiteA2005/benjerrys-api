const express = require("express");

const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;