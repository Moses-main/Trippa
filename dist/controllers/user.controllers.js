"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const helpers_1 = __importDefault(require("../utils/helpers"));
const app_error_1 = __importDefault(require("../utils/app.error"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const crypto_1 = __importDefault(require("crypto"));
const token_models_1 = __importDefault(require("../models/token.models"));
class UserController {
    initialRoute(req, res) {
        res.status(200).json({
            status: true,
            message: "Welcome To Trippa API",
        });
    }
    async signUp(req, res, next) {
        try {
            const body = req.body;
            if (!body.email || !body.password) {
                const err = app_error_1.default.badRequest(false, "Missing required fields: email, password");
                return res.status(err.statusCode).json({ error: err });
            }
            const userExists = await server_1.userService.getUserByEmail(body.email);
            if (userExists) {
                const err = app_error_1.default.conflict(false, "User already exists");
                return res.status(err.statusCode).json({ error: err });
            }
            body.password = await helpers_1.default.hashPassword(body.password);
            const user = await server_1.userService.createUser(body);
            if (!user) {
                const err = app_error_1.default.internal(false, "Error creating user");
                return res.status(err.statusCode).json({ error: err });
            }
            res.status(201).json({
                status: true,
                message: "User created successfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async signIn(req, res, next) {
        try {
            const body = req.body;
            if (!body.email || !body.password) {
                const err = app_error_1.default.badRequest(false, "Missing required fields: email, password");
                return res.status(err.statusCode).json({ error: err });
            }
            const user = await server_1.userService.getUserByEmail(body.email);
            if (!user) {
                const err = app_error_1.default.notFound(false, "User not found");
                return res.status(err.statusCode).json({ error: err });
            }
            const isMatch = await helpers_1.default.comparePassword(body.password, user.password);
            if (!isMatch) {
                const err = app_error_1.default.unauthorized(false, "Invalid credentials");
                return res.status(err.statusCode).json({ error: err });
            }
            const tokenPayload = {
                userId: user._id,
                email: user.email,
            };
            const token = new jwt_1.default(process.env.JWT_SECRET).sign(tokenPayload, { expiresIn: "2h" });
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 2 * 60 * 60 * 1000, // 2 hours
                sameSite: "strict",
            });
            // Remove password from user object
            user.password = "";
            res.status(200).json({
                status: true,
                message: "User logged in statusfully",
                data: {
                    user,
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const body = req.body;
            const id = req.params.id;
            if (!id) {
                const err = app_error_1.default.badRequest(false, "Missing required fields: id");
                return res.status(err.statusCode).json({ error: err });
            }
            const user = await server_1.userService.updateUser(id, body);
            if (!user) {
                const err = app_error_1.default.notFound(false, "User not found");
                return res.status(err.statusCode).json({ error: err });
            }
            user.password = "";
            res.status(200).json({
                status: true,
                message: "User updated statusfully",
                data: user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                const err = app_error_1.default.badRequest(false, "Missing required fields: id");
                return res.status(err.statusCode).json({ error: err });
            }
            const isDeleted = await server_1.userService.deleteUser(id);
            if (!isDeleted) {
                const err = app_error_1.default.notFound(false, "User not found");
                return res.status(err.statusCode).json({ error: err });
            }
            res.status(200).json({
                status: true,
                message: "User deleted statusfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async forgetPasswordRequest(req, res, next) {
        const { email } = req.body;
        if (!email) {
            const err = app_error_1.default.badRequest(false, "Missing required fields: email.");
            return res.status(err.statusCode).json({ error: err });
        }
        const user = await server_1.userService.getUserByEmail(email);
        if (user) {
            //console.log(user, "user");
            let token = await server_1.tokenService.checkIfUsertokenExists(user === null || user === void 0 ? void 0 : user.email);
            // console.log(token, " this is the token");
            if (token)
                await server_1.tokenService.deleteToken(token === null || token === void 0 ? void 0 : token._id);
            let resetToken = crypto_1.default.randomBytes(24).toString("hex");
            let hashedToken = await helpers_1.default.hashToken(resetToken);
            const newToken = new token_models_1.default({
                userID: user === null || user === void 0 ? void 0 : user.email,
                token: hashedToken,
                createdAt: Date.now(),
            });
            try {
                await server_1.userService.createToken(newToken);
                const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`;
                //await Helpers.sendEmail(user?.email, user?.name as string, resetUrl);
                res.status(200).json({
                    status: true,
                    message: "Link for password reset has been sent to your email",
                    data: [],
                });
            }
            catch (error) {
                const err = app_error_1.default.internal(false, "An error occurred, please try again");
                res.status(err.statusCode).json({ error: err });
            }
        }
        else {
            const err = app_error_1.default.notFound(false, "User does not exist");
            res.status(err.statusCode).json({ error: err });
        }
    }
}
exports.default = UserController;
