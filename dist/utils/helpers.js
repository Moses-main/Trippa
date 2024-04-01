"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Helpers {
    static async hashPassword(password) {
        const salt = await bcrypt_1.default.genSalt(10);
        return await bcrypt_1.default.hash(password, salt);
    }
    static async comparePassword(password, hash) {
        return await bcrypt_1.default.compare(password, hash);
    }
    static async hashToken(token) {
        const salt = await bcrypt_1.default.genSalt(10);
        let hash = await bcrypt_1.default.hash(token, salt);
        return hash;
    }
}
exports.default = Helpers;
