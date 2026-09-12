const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("db connected");
    } catch (error) {
        console.log("mongoDB connection failed: ", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;