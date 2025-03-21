const express = require("express");
const axios = require("axios");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const LICENCE_KEY = process.env.LICENCE_KEY || "e6ce0b9455cab0e494be4587d016c7c2";

// Connect to PostgreSQL
const dbUrl = process.env.DATABASE_URL || "postgres://postgres:1234@localhost:5432/deviceatlas";

const sequelize = new Sequelize(dbUrl, {
    dialect: "postgres",
    logging: false, // Disable logging for cleaner output
});

const cors = require("cors");


app.use(cors({
    origin: "http://localhost:3000", // ? Allow only frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true // ? Required for cookies/auth headers
}));
app.use(express.json()); // Parse JSON request body

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Define database model for storing device details
const Device = sequelize.define("devices", {
    model: DataTypes.STRING,
    vendor: DataTypes.STRING,
    osName: DataTypes.STRING,
    osVersion: DataTypes.STRING,
    browserName: DataTypes.STRING,
    primaryHardwareType: DataTypes.STRING,
}, { timestamps: true });

// List of user agents to fetch device data
const USER_AGENTS = [
    "Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36 © DeviceAtlas Ltd 2025 Confidential",
    "Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/47.1.79 like Chrome/47.0.2526.80 Safari/537.36",
    "Mozilla/5.0 (iPad; CPU OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/112.0.5615.46 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 12; SM-X906C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36",
    "Dalvik/2.1.0 (Linux; U; Android 10; ACTAB1021 Build/QP1A.190711.020)",
    "Mozilla/5.0 (Linux; Android 13; SM-A515U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 5.0.2; LG-V410/V41020c Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/34.0.1847.118 Safari/537.36"
];

// Function to fetch device details using an API
const fetchDeviceData = async (userAgent) => {
    const url = `https://region0.deviceatlascloud.com/v1/detect/properties?licencekey=${LICENCE_KEY}&useragent=${encodeURIComponent(userAgent)}`;
    try {
        const { data } = await axios.get(url);
        return data.properties;
    } catch (error) {
        console.error("Error fetching data", error);
        return null;
    }
};

// Fetch device details and store in database
app.get("/fetch-devices", async (req, res) => {
    await sequelize.sync();
    await Device.destroy({ where: {} }); // Clear previous data before inserting new

    for (const ua of USER_AGENTS) {
        const deviceData = await fetchDeviceData(ua);
        if (deviceData) {
            await Device.create({ ...deviceData });
        }
    }
    res.json({ message: "Devices fetched and stored." });
});

// Fetch only tablets from the database
app.get("/tablets", async (req, res) => {
    const tablets = await Device.findAll({
        where: { "primaryHardwareType": "Tablet" },
        order: [["osVersion", "ASC"]], // Sort tablets by OS version
    });
    res.json(tablets);
});

// Fetch all device records from the database
app.get("/all", async (req, res) => {
    const device = await Device.findAll({
        order: [["primaryHardwareType", "ASC"]]
    });
    res.json(device);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
