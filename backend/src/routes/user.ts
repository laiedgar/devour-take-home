import express from "express";
import { UserModel } from "../models/User";

const userRouter = express.Router();

/**
 * @route GET /user/:id
 * @param {string} id - User ID
 * @returns {User} - User object with experiencePoints field
 */
userRouter.get("/:id", async (req, res) => {
	const user = await UserModel.findById(req.params.id).select('+experiencePoints');
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
	const users = await UserModel.aggregate([
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
	const user = await UserModel.findById(userId).select('community');
	if (!user) {
		return res.status(404).send({ message: "User not found" });
	} else if (user?.community !== "") {
		res.status(403).send({ message: "User already in a community" });
	} else {
		await user?.updateOne({ community: communityId })
		res.status(200).send()
	}
});

/**
 * @route DELETE /user/:userId/leave/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description leaves a community
 */
userRouter.delete("/:userId/leave/:communityId", async (req, res) => {
	const { userId, communityId } = req.params;
	const user = await UserModel.findById(userId).select('community');
	if (!user) {
		return res.status(404).send({ message: "User not found" });
	} else if (user?.community !== communityId) {
		res.status(403).send({ message: "User is not part of community" });
	} else {
		await user?.updateOne({ community: "" })
		res.status(200).send()
	}
});

export {
	userRouter
}
