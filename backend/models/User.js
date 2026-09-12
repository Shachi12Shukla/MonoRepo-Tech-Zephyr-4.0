const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        // Player progression
        level: {
            type: Number,
            default: 1
        },

        xp: {
            type: Number,
            default: 0
        },

        gold: {
            type: Number,
            default: 0
        },

        streak: {
            type: Number,
            default: 0
        },

        longestStreak: {
            type: Number,
            default: 0
        },

        lastQuestCompletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;