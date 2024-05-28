"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
/**
 * @route GET /user/:id
 * @param {string} id - User ID
 * @returns {User} - User object with experiencePoints field
 */
userRouter.get("/:id", async (req, res) => {
    const user = await User_1.UserModel.findById(req.params.id).select('+experiencePoints');
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
});
/**
 * @route GET /user
 * @returns {Array} - Array of User objects
 * @note Adds the virtual field of totalExperience to the user.
 * @hint You might want to use a similar aggregate in your leaderboard code.
 */
userRouter.get("/", async (_, res) => {
    const users = await User_1.UserModel.aggregate([
        {
            $unwind: "$experiencePoints"
        },
        {
            $group: {
                _id: "$_id",
                email: { $first: "$email" },
                profilePicture: { $first: "$profilePicture" },
                totalExperience: { $sum: "$experiencePoints.points" }
            }
        }
    ]);
    res.send(users);
});
/**
 * @route POST /user/:userId/join/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description Joins a community
 */
userRouter.post("/:userId/join/:communityId", async (req, res) => {
    const { userId, communityId } = req.params;
    // TODO: Implement the functionality to join a community
    res.status(501).send();
});
/**
 * @route DELETE /user/:userId/leave/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description leaves a community
 */
userRouter.delete("/:userId/leave/:communityId", async (req, res) => {
    const { userId, communityId } = req.params;
    // TODO: Implement the functionality to leave a community
    res.status(501).send();
});
