const mongoose = require("mongoose");

const orderFlavorSchema = new mongoose.Schema(
    {
        flavor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flavor",
            default: null
        },
        customName: {
            type: String,
            trim: true,
            default: null
        },
        customColor: {
            type: String,
            trim: true,
            default: null
        }
    },
    {
        _id: false
    }
);

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

        flavors: {
            type: [orderFlavorSchema],
            required: true,
            validate: {
                validator: (flavors) =>
                    Array.isArray(flavors) &&
                    flavors.length >= 1 &&
                    flavors.length <= 2,
                message: "Een bestelling moet 1 of 2 smaken bevatten"
            }
        },

        toppings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Topping"
            }
        ],

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "te verwerken",
                "in bereiding",
                "klaar",
                "verzonden",
                "geannuleerd"
            ],
            default: "te verwerken"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);