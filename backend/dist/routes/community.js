"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityRouter = void 0;
const express_1 = __importDefault(require("express"));
const Community_1 = require("../models/Community");
const communityRouter = express_1.default.Router();
exports.communityRouter = communityRouter;
/**
 * @route GET /community/:id
 * @param {string} id - Community ID
 * @returns {Community} - Community object
 */
communityRouter.get("/:id", async (req, res) => {
    const community = await Community_1.CommunityModel.findById(req.params.id).lean();
    if (!community) {
        return res.status(404).send({ message: "Community not found" });
    }
    res.send(community);
});
/**
 * @route GET /community
 * @returns {Array} - Array of Community objects
 */
communityRouter.get("/", async (_, res) => {
    const communities = await Community_1.CommunityModel.find({}).lean();
    res.send(communities);
});
