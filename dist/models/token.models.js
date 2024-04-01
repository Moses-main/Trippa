"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Token = (0, mongoose_1.model)("Token", tokenSchema);
exports.default = Token;
