const Quest = require("../models/Quest");


const createQuest = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            difficulty
        } = req.body;

        const quest = await Quest.create({

            userId: req.userId,

            title,

            description,

            category,

            // base rewards
            xpReward: 20,

            goldReward: 10

        });


        return res.status(201).json({

            message: "Quest created successfully",

            quest

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};



const getMyQuests = async (req, res) => {

    try {

        const quests = await Quest.find({
            userId: req.userId
        }).sort({
            createdAt: -1
        });


        return res.status(200).json({
            quests
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};



const deleteQuest = async (req, res) => {

    try {

        const quest = await Quest.findOne({
            _id: req.params.id,
            userId: req.userId
        });


        if (!quest) {

            return res.status(404).json({
                message: "Quest not found"
            });
        }


        await Quest.deleteOne({
            _id: req.params.id
        });


        return res.status(200).json({
            message: "Quest deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};


const completeQuest = async (req, res) => {
    try {
        const questId = req.params.id;
        const userId = req.userId;

        const quest = await Quest.findOne({
            _id: questId,
            userId: userId
        });

        if (!quest) {
            return res.status(404).json({
                message: "Quest not found"
            });
        }

        if (quest.completed) {
            return res.status(400).json({
                message: "Quest already completed"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Mark quest as completed
        quest.completed = true;
        quest.completedAt = new Date();

        await quest.save();

        // Award rewards
        user.xp += quest.xpReward;
        user.gold += quest.goldReward;

        // -------------------------
        // Update streak
        // -------------------------

        const today = new Date();

        if (!user.lastQuestCompletedAt) {
            user.streak = 1;
        } else {
            const lastDate = new Date(user.lastQuestCompletedAt);

            const todayStart = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );

            const lastDateStart = new Date(
                lastDate.getFullYear(),
                lastDate.getMonth(),
                lastDate.getDate()
            );

            const difference =
                (todayStart - lastDateStart) /
                (1000 * 60 * 60 * 24);

            if (difference === 0) {
                // Already completed a quest today
                // Keep the same streak
            } else if (difference === 1) {
                // Completed yesterday
                user.streak += 1;
            } else {
                // Streak was broken
                user.streak = 1;
            }
        }

        // Update longest streak
        if (user.streak > user.longestStreak) {
            user.longestStreak = user.streak;
        }

        user.lastQuestCompletedAt = today;

        // -------------------------
        // Level up
        // -------------------------

        let levelUp = false;

        while (user.xp >= getXpRequired(user.level)) {
            user.xp -= getXpRequired(user.level);
            user.level += 1;
            levelUp = true;
        }

        await user.save();

        return res.status(200).json({
            message: "Quest completed successfully",

            quest: {
                id: quest._id,
                title: quest.title,
                completed: quest.completed,
                completedAt: quest.completedAt
            },

            rewards: {
                xp: quest.xpReward,
                gold: quest.goldReward
            },

            player: {
                level: user.level,
                xp: user.xp,
                gold: user.gold,
                streak: user.streak,
                longestStreak: user.longestStreak
            },

            levelUp
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to complete quest"
        });
    }
};



module.exports = {
    createQuest,
    getMyQuests,
    deleteQuest,
    completeQuest
};