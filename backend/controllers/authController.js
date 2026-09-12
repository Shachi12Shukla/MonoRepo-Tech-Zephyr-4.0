const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const signup = async (req, res) => {

    try {
        const {firstName,lastName,username,password} = req.body;

        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({firstName,lastName,username,password: hashedPassword});

        return res.status(201).json({
            message: "Signup successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });

    }
};


const signin = async (req, res) => {

    try {
        const {username,password} = req.body;

        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const passwordMatch = await bcrypt.compare(password,user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });

        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: "7d"});

        return res.status(200).json({
            message: "Signin successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });

    }
};


module.exports = {signup,signin};