const express = require("express");

const {getMe} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.get("/me",authMiddleware,getMe);


module.exports = userRouter;