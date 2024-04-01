"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestamps: true });
// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
    }
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
