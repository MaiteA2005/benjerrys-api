const mongoose = require("mongoose");

const toppingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        modelUrl: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            default: 0
        },
        position: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 1.2 },
            z: { type: Number, default: 0 }
        },
        scale: {
            type: Number,
            default: 1
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Topping", toppingSchema);