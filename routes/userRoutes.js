// routes/userRoutes.js
const express = require("express");
const router = express.Router();
import userController from "../controllers/userController";

// CRUD endpoints for users
router.route("/profile").get(userController.getUserProfile).put(userController.updateUserProfile);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
// router.post("/", userController.createUser);
//router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
