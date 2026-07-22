const mongoose = require("mongoose");

const Order = require("../models/Order");
const IceCreamBase = require("../models/IceCreamBase");
const Flavor = require("../models/Flavor");
const Topping = require("../models/Topping");

const populateOrder = (query) =>
    query
        .populate("iceCreamBase")
        .populate("flavors.flavor")
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
        const order = await populateOrder(
            Order.findById(req.params.id)
        );

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
            flavors = [],
            toppings = []
        } = req.body;

        if (!customerName?.trim()) {
            return res.status(400).json({
                message: "Naam is verplicht"
            });
        }

        if (
            !address?.street?.trim() ||
            !address?.houseNumber?.trim() ||
            !address?.postalCode?.trim() ||
            !address?.city?.trim()
        ) {
            return res.status(400).json({
                message: "Vul het volledige adres in"
            });
        }

        if (
            !Array.isArray(flavors) ||
            flavors.length < 1 ||
            flavors.length > 2
        ) {
            return res.status(400).json({
                message: "Kies 1 of 2 smaken"
            });
        }

        if (!Array.isArray(toppings)) {
            return res.status(400).json({
                message: "Toppings moeten een lijst zijn"
            });
        }

        const selectedBase =
            await IceCreamBase.findById(iceCreamBase);

        if (!selectedBase) {
            return res.status(400).json({
                message: "Ongeldige ijsbasis"
            });
        }

        const flavorIds = flavors
            .filter((item) => item.flavor)
            .map((item) => item.flavor);

        const hasInvalidFlavorId = flavorIds.some(
            (id) => !mongoose.Types.ObjectId.isValid(id)
        );

        if (hasInvalidFlavorId) {
            return res.status(400).json({
                message: "Een of meerdere smaken zijn ongeldig"
            });
        }

        const selectedFlavors = await Flavor.find({
            _id: {
                $in: flavorIds
            }
        });

        if (selectedFlavors.length !== flavorIds.length) {
            return res.status(400).json({
                message: "Een of meerdere smaken bestaan niet"
            });
        }

        const normalizedFlavors = [];

        for (const item of flavors) {
            if (item.flavor) {
                normalizedFlavors.push({
                    flavor: item.flavor,
                    customName: null,
                    customColor: null
                });

                continue;
            }

            const customName =
                item.customName?.trim();

            const customColor =
                item.customColor?.trim();

            if (!customName || !customColor) {
                return res.status(400).json({
                    message:
                        "Een eigen smaak moet een naam en kleur bevatten"
                });
            }

            normalizedFlavors.push({
                flavor: null,
                customName,
                customColor
            });
        }

        const hasInvalidToppingId = toppings.some(
            (id) => !mongoose.Types.ObjectId.isValid(id)
        );

        if (hasInvalidToppingId) {
            return res.status(400).json({
                message: "Een of meerdere toppings zijn ongeldig"
            });
        }

        const selectedToppings = await Topping.find({
            _id: {
                $in: toppings
            }
        });

        if (selectedToppings.length !== toppings.length) {
            return res.status(400).json({
                message: "Een of meerdere toppings bestaan niet"
            });
        }

        const flavorsPrice = selectedFlavors.reduce(
            (total, flavor) =>
                total + Number(flavor.price || 0),
            0
        );

        const toppingsPrice = selectedToppings.reduce(
            (total, topping) =>
                total + Number(topping.price || 0),
            0
        );
        
        const totalPrice =
            Number(selectedBase.price || 0) +
            flavorsPrice +
            toppingsPrice;

        const order = await Order.create({
            customerName: customerName.trim(),

            address: {
                street: address.street.trim(),
                houseNumber:
                    address.houseNumber.trim(),
                postalCode:
                    address.postalCode.trim(),
                city: address.city.trim()
            },

            iceCreamBase,
            flavors: normalizedFlavors,
            toppings,
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
            "in bereiding",
            "klaar",
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
        const order = await Order.findByIdAndDelete(
            req.params.id
        );

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