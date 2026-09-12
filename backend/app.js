const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questRoutes = require("./routes/questRoutes")

const app = express();

const allowedOrigins = [
    "http://localhost:5173"
]


app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Doodo API is running"
    });
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/quests", questRoutes);

module.exports = app;

