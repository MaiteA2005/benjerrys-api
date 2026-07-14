const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerName: {
        type: String,
        required: true,
        trim: true
        },
        address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        houseNumber: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        }
        },
        iceCreamBase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IceCreamBase",
        required: true
        },
        flavor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flavor",
        required: true
        },
        toppings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topping"
        }
        ],
        customColor: {
        type: String,
        default: null
        },
        totalPrice: {
        type: Number,
        required: true,
        min: 0
        },
        status: {
        type: String,
        enum: ["te verwerken", "verzonden", "geannuleerd"],
        default: "te verwerken"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);