const express = require("express");

const {signup, signin} = require("../controllers/authController");

const {validateSignup, validateSignin} = require("../validators/authValidator");

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);

authRouter.post("/signin", validateSignin, signin);

module.exports = authRouter;