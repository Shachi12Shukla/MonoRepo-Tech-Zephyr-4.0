const { z } = require("zod");


const signupSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters"),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});


const signinSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required"),

    password: z
        .string()
        .min(1, "Password is required")
});


const validateSignup = (req, res, next) => {

    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
};


const validateSignin = (req, res, next) => {

    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
};


module.exports = {
    validateSignup,
    validateSignin
};