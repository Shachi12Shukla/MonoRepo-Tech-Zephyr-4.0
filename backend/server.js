require("dotenv").config()

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 7000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log('server started on port', PORT);
    })
}

startServer();