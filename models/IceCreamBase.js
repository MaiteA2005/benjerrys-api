const mongoose = require("mongoose");

const iceCreamBaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["cone", "cup"],
            required: true
        },
        modelUrl: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
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

module.exports = mongoose.model("IceCreamBase", iceCreamBaseSchema);