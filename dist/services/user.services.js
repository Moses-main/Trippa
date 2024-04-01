"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongodb_1 = require("mongodb");
class UserService {
    constructor(db) {
        this.db = db;
    }
    async createUser(user) {
        const result = await this.db
            .collection("users")
            .insertOne(user);
        return Object.assign(Object.assign({}, user), { _id: result.insertedId.toString() });
    }
    async getUserById(id) {
        const result = await this.db
            .collection("users")
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        return result ? Object.assign(Object.assign({}, result), { _id: result._id.toString() }) : null;
    }
    async getUserByEmail(email) {
        const result = await this.db
            .collection("users")
            .findOne({ email });
        return result ? Object.assign(Object.assign({}, result), { _id: result._id.toString() }) : null;
    }
    async updateUser(id, user) {
        const result = await this.db
            .collection("users")
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: user }, { returnDocument: "after", projection: { password: 0 } });
        // return result.value
        //   ? { ...result.value, _id: result.value._id.toString() }
        //   : null;
        return null;
    }
    async deleteUser(id) {
        const result = await this.db
            .collection("users")
            .deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return result.deletedCount === 1;
    }
    async createToken(token) {
        const result = await this.db
            .collection("request_token")
            .insertOne(token);
        return Object.assign(Object.assign({}, token), { _id: result.insertedId.toString() });
    }
}
exports.UserService = UserService;
