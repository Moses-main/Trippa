const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers, getUserById, deleteUser } = require("../controllers/userController");

// CRUD endpoints for users
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
// router.post("/", userController.createUser);
//router.put("/:id", userController.updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
