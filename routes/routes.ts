import express, { Request, Response } from "express";
import UserController from "../controllers/user.controllers";

const router = express.Router();

const userController: UserController = new UserController();

router.get("/", userController.initialRoute);
router.post("/register", userController.signUp);
router.post("/login",userController.signIn)

// Wildcard route
router.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default router;
