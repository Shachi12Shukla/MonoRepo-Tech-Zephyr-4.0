const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        category: {
            type: String,
            required: true,
            enum: [
                "fitness",
                "study",
                "work",
                "health",
                "personal",
                "creativity"
            ]
        },

        xpReward: {
            type: Number,
            required: true
        },

        goldReward: {
            type: Number,
            required: true
        },

        completed: {
            type: Boolean,
            default: false
        },

        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Quest = mongoose.model("Quest", questSchema);

module.exports = Quest;