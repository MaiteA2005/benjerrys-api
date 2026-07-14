const Order = require("../models/Order");
const IceCreamBase = require("../models/IceCreamBase");
const Flavor = require("../models/Flavor");
const Topping = require("../models/Topping");

const populateOrder = (query) =>
    query
        .populate("iceCreamBase")
        .populate("flavor")
        .populate("toppings");

const getOrders = async (req, res) => {
    try {
        const orders = await populateOrder(
        Order.find().sort({ createdAt: -1 })
        );

        res.json(orders);
    } catch (error) {
        res.status(500).json({
        message: "Bestellingen ophalen mislukt",
        error: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await populateOrder(Order.findById(req.params.id));

        if (!order) {
        return res.status(404).json({
            message: "Bestelling niet gevonden"
        });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
        message: "Bestelling ophalen mislukt",
        error: error.message
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const {
        customerName,
        address,
        iceCreamBase,
        flavor,
        toppings = [],
        customColor
        } = req.body;

        const selectedBase = await IceCreamBase.findById(iceCreamBase);
        const selectedFlavor = await Flavor.findById(flavor);
        const selectedToppings = await Topping.find({
        _id: { $in: toppings }
        });

        if (!selectedBase) {
        return res.status(400).json({
            message: "Ongeldige ijsbasis"
        });
        }

        if (!selectedFlavor) {
        return res.status(400).json({
            message: "Ongeldige smaak"
        });
        }

        if (selectedToppings.length !== toppings.length) {
        return res.status(400).json({
            message: "Een of meerdere toppings zijn ongeldig"
        });
        }

        const toppingsPrice = selectedToppings.reduce(
        (total, topping) => total + topping.price,
        0
        );

        const totalPrice =
        selectedBase.price +
        selectedFlavor.price +
        toppingsPrice;

        const order = await Order.create({
        customerName,
        address,
        iceCreamBase,
        flavor,
        toppings,
        customColor: customColor || null,
        totalPrice
        });

        const populatedOrder = await populateOrder(
        Order.findById(order._id)
        );

        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(400).json({
        message: "Bestelling aanmaken mislukt",
        error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const allowedStatuses = [
            "te verwerken",
            "verzonden",
            "geannuleerd"
        ];

        const { status } = req.body;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Ongeldige status"
            });
        }

        const order = await populateOrder(
            Order.findByIdAndUpdate(
                req.params.id,
                { status },
                {
                new: true,
                runValidators: true
                }
            )
        );

        if (!order) {
            return res.status(404).json({
                message: "Bestelling niet gevonden"
            });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({
        message: "Status aanpassen mislukt",
        error: error.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
        return res.status(404).json({
            message: "Bestelling niet gevonden"
        });
        }

        res.json({
        message: "Bestelling verwijderd"
        });
    } catch (error) {
        res.status(500).json({
        message: "Bestelling verwijderen mislukt",
        error: error.message
        });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder
};