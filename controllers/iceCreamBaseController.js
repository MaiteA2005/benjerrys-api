const IceCreamBase = require("../models/IceCreamBase");

const getIceCreamBases = async (req, res) => {
    try {
        const bases = await IceCreamBase.find().sort({ createdAt: -1 });
        res.json(bases);
    } catch (error) {
        res.status(500).json({ message: "Bases ophalen mislukt" });
    }
};

const getIceCreamBaseById = async (req, res) => {
    try {
        const base = await IceCreamBase.findById(req.params.id);

        if (!base) {
        return res.status(404).json({ message: "Base niet gevonden" });
        }

        res.json(base);
    } catch (error) {
        res.status(500).json({ message: "Base ophalen mislukt" });
    }
};

const createIceCreamBase = async (req, res) => {
    try {
        const base = await IceCreamBase.create(req.body);
        res.status(201).json(base);
    } catch (error) {
        res.status(400).json({ message: "Base aanmaken mislukt" });
    }
};

const updateIceCreamBase = async (req, res) => {
    try {
        const base = await IceCreamBase.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        });

        if (!base) {
        return res.status(404).json({ message: "Base niet gevonden" });
        }

        res.json(base);
    } catch (error) {
        res.status(400).json({ message: "Base aanpassen mislukt" });
    }
};

const deleteIceCreamBase = async (req, res) => {
    try {
        const base = await IceCreamBase.findByIdAndDelete(req.params.id);

        if (!base) {
        return res.status(404).json({ message: "Base niet gevonden" });
        }

        res.json({ message: "Base verwijderd" });
    } catch (error) {
        res.status(500).json({ message: "Base verwijderen mislukt" });
    }
};

module.exports = {
    getIceCreamBases,
    getIceCreamBaseById,
    createIceCreamBase,
    updateIceCreamBase,
    deleteIceCreamBase
};