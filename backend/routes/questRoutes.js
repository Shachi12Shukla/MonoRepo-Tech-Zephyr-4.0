const express = require("express");

const {
    createQuest,
    getMyQuests,
    deleteQuest,
    completeQuest
} = require("../controllers/questController");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    validateCreateQuest
} = require("../validators/questValidator");


const questRouter = express.Router();


questRouter.post(
    "/",
    authMiddleware,
    validateCreateQuest,
    createQuest
);


questRouter.get(
    "/",
    authMiddleware,
    getMyQuests
);


questRouter.delete(
    "/:id",
    authMiddleware,
    deleteQuest
);

questRouter.post(
    "/:id/complete", 
    authMiddleware, 
    completeQuest
);


module.exports = questRouter;