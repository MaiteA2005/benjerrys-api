const mongoose = require("mongoose");

const flavorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        isCustom: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model("Flavor", flavorSchema);