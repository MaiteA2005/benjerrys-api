const Flavor = require("../models/Flavor");

const getFlavors = async (req, res) => {
    try {
        const flavors = await Flavor.find().sort({ createdAt: -1 });
        res.json(flavors);
    } catch (error) {
        res.status(500).json({ message: "Smaken ophalen mislukt" });
    }
};

const getFlavorById = async (req, res) => {
    try {
        const flavor = await Flavor.findById(req.params.id);

        if (!flavor) {
        return res.status(404).json({ message: "Smaak niet gevonden" });
        }

        res.json(flavor);
    } catch (error) {
        res.status(500).json({ message: "Smaak ophalen mislukt" });
    }
};

const createFlavor = async (req, res) => {
    try {
        const flavor = await Flavor.create(req.body);
        res.status(201).json(flavor);
    } catch (error) {
        res.status(400).json({ message: "Smaak aanmaken mislukt" });
    }
};

const updateFlavor = async (req, res) => {
    try {
        const flavor = await Flavor.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        });

        if (!flavor) {
        return res.status(404).json({ message: "Smaak niet gevonden" });
        }

        res.json(flavor);
    } catch (error) {
        res.status(400).json({ message: "Smaak aanpassen mislukt" });
    }
};

const deleteFlavor = async (req, res) => {
    try {
        const flavor = await Flavor.findByIdAndDelete(req.params.id);

        if (!flavor) {
        return res.status(404).json({ message: "Smaak niet gevonden" });
        }

        res.json({ message: "Smaak verwijderd" });
    } catch (error) {
        res.status(500).json({ message: "Smaak verwijderen mislukt" });
    }
};

module.exports = {
    getFlavors,
    getFlavorById,
    createFlavor,
    updateFlavor,
    deleteFlavor
};