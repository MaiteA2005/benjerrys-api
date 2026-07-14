const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const iceCreamBaseRoutes = require("./routes/iceCreamBaseRoutes");
const flavorRoutes = require("./routes/flavorRoutes");
const toppingRoutes = require("./routes/toppingRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Ben & Jerry's API werkt 🚀",
        endpoints: {
        bases: "/api/bases",
        flavors: "/api/flavors",
        toppings: "/api/toppings"
        }
    });
});

app.use("/api/bases", iceCreamBaseRoutes);
app.use("/api/flavors", flavorRoutes);
app.use("/api/toppings", toppingRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});