const { z } = require("zod");

const createQuestSchema = z.object({

    title: z
        .string()
        .min(2, "Quest title must be at least 2 characters"),

    description: z
        .string()
        .optional(),

    category: z.enum([
        "fitness",
        "study",
        "work",
        "health",
        "personal",
        "creativity"
    ])
});


const validateCreateQuest = (req, res, next) => {

    const result = createQuestSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            message: "Invalid quest data",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
};


module.exports = {
    validateCreateQuest
};