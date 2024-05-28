"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const user_1 = require("./user");
const community_1 = require("./community");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use("/community", community_1.communityRouter);
exports.apiRouter.use("/user", user_1.userRouter);
exports.apiRouter.use("/utils", utils_1.utilsRouter);
