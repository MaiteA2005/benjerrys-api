const Topping = require("../models/Topping");

const getToppings = async (req, res) => {
    try {
        const toppings = await Topping.find().sort({ createdAt: -1 });
        res.json(toppings);
    } catch (error) {
        res.status(500).json({ message: "Toppings ophalen mislukt" });
    }
};

const getToppingById = async (req, res) => {
    try {
        const topping = await Topping.findById(req.params.id);

        if (!topping) {
        return res.status(404).json({ message: "Topping niet gevonden" });
        }

        res.json(topping);
    } catch (error) {
        res.status(500).json({ message: "Topping ophalen mislukt" });
    }
};

const createTopping = async (req, res) => {
    try {
        const topping = await Topping.create(req.body);
        res.status(201).json(topping);
    } catch (error) {
        res.status(400).json({ message: "Topping aanmaken mislukt" });
    }
};

const updateTopping = async (req, res) => {
    try {
        const topping = await Topping.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        });

        if (!topping) {
        return res.status(404).json({ message: "Topping niet gevonden" });
        }

        res.json(topping);
    } catch (error) {
        res.status(400).json({ message: "Topping aanpassen mislukt" });
    }
};

const deleteTopping = async (req, res) => {
    try {
        const topping = await Topping.findByIdAndDelete(req.params.id);

        if (!topping) {
        return res.status(404).json({ message: "Topping niet gevonden" });
        }

        res.json({ message: "Topping verwijderd" });
    } catch (error) {
        res.status(500).json({ message: "Topping verwijderen mislukt" });
    }
};

module.exports = {
    getToppings,
    getToppingById,
    createTopping,
    updateTopping,
    deleteTopping
};