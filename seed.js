const mongoose = require("mongoose");
require("dotenv").config();

const IceCreamBase = require("./models/IceCreamBase");
const Flavor = require("./models/Flavor");
const Topping = require("./models/Topping");

const bases = [
    {
        name: "Hoorntje",
        type: "cone",
        modelUrl: "/models/cone.glb",
        price: 0,
        isActive: true
    },
    {
        name: "Potje",
        type: "cup",
        modelUrl: "/models/cup.glb",
        price: 0.5,
        isActive: true
    }
];

const flavors = [
    {
        name: "Vanille",
        description: "Romig vanille-ijs",
        color: "#F4E6B5",
        price: 3,
        isCustom: false,
        isActive: true
    },
    {
        name: "Aardbei",
        description: "Fris aardbeienijs",
        color: "#F58FA8",
        price: 3,
        isCustom: false,
        isActive: true
    },
    {
        name: "Chocolade",
        description: "Vol chocolade-ijs",
        color: "#6B3E26",
        price: 3.5,
        isCustom: false,
        isActive: true
    },
    {
        name: "Cookie Dough",
        description: "Vanille-ijs met koekjesdeeg",
        color: "#D9B98C",
        price: 4,
        isCustom: false,
        isActive: true
    },
    {
        name: "Mint",
        description: "Fris muntijs",
        color: "#A8D8B9",
        price: 3.5,
        isCustom: false,
        isActive: true
    }
];

const toppings = [
    {
        name: "Slagroom",
        color: "#FFFFFF",
        price: 0.5,
        position: { x: 0, y: 1.3, z: 0 },
        scale: 1,
        isActive: true
    },
    {
        name: "Kers",
        color: "#F58FA8",
        price: 0.5,
        position: { x: 0, y: 1.8, z: 0 },
        scale: 0.6,
        isActive: true
    },
    {
        name: "Sprinkles",
        color: "#FFD700",
        price: 0.4,
        position: { x: 0, y: 1.2, z: 0 },
        scale: 1,
        isActive: true
    },
    {
        name: "Cookie Chunks",
        color: "#D9B98C",
        price: 0.75,
        position: { x: 0, y: 1.25, z: 0 },
        scale: 0.8,
        isActive: true
    },
    {
        name: "Chocolate Sauce",
        color: "#6B3E26",
        price: 0.6,
        position: { x: 0, y: 1.2, z: 0 },
        scale: 1,
        isActive: true
    },
    {
        name: "Strawberry Sauce",
        color: "#F58FA8",
        price: 0.6,
        position: { x: 0, y: 1.2, z: 0 },
        scale: 1,
        isActive: true
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB verbonden");

        await IceCreamBase.deleteMany();
        await Flavor.deleteMany();
        await Topping.deleteMany();

        console.log("Bestaande testdata verwijderd");

        await IceCreamBase.insertMany(bases);
        await Flavor.insertMany(flavors);
        await Topping.insertMany(toppings);

        console.log("Seeddata succesvol toegevoegd");
    } catch (error) {
        console.error("Seeddata toevoegen mislukt:");
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
        console.log("Databaseverbinding gesloten");
    }
};

seedDatabase();