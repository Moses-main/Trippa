"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI, " this is the mongo uri");
const connectDB = async () => {
    try {
        const client = await mongodb_1.MongoClient.connect(MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        });
        db = client.db(process.env.DB_NAME);
        console.log("\x1b[32m%s\x1b[0m", "Database connected");
        return db;
    }
    catch (error) {
        console.log("\x1b[31m%s\x1b[0m", "Database connection failed");
        console.error(error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
function getDb() {
    if (!db) {
        throw new Error("Database not initialized. Call connectToDb first.");
    }
    return db;
}
exports.getDb = getDb;
