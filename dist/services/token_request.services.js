"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const mongodb_1 = require("mongodb");
class TokenService {
    constructor(db) {
        this.db = db;
    }
    async checkIfUsertokenExists(email) {
        const result = await this.db
            .collection("request_token")
            .findOne({ userID: email });
        return (result === null || result === void 0 ? void 0 : result._id) ? Object.assign(Object.assign({}, result), { _id: result === null || result === void 0 ? void 0 : result._id }) : null;
    }
    async deleteToken(id) {
        const result = await this.db
            .collection("request_token")
            .deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return result.deletedCount === 1;
    }
}
exports.TokenService = TokenService;
