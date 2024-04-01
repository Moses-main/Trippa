"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const router = express_1.default.Router();
const userController = new user_controllers_1.default();
router.get("/", userController.initialRoute);
router.post("/register", userController.signUp);
router.post("/login", userController.signIn);
// Wildcard route
router.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = router;
