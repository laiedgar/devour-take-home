"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const typegoose_1 = require("@typegoose/typegoose");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
typegoose_1.mongoose.connect('mongodb://localhost:27017')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB. Check the README on how to run the database.', error);
});
app.use("/", routes_1.apiRouter);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
