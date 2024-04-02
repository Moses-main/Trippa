import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../models/user.models";
import { userService, tokenService } from "../server";
import Helpers from "../utils/helpers";
import HandleError from "../utils/app.error";
import JwtUtil, { JwtPayload } from "../utils/jwt";
import crypto from "crypto";
import Token, { tokenDocument } from "../models/token.models";

class UserController {
  initialRoute(req: Request, res: Response) {
    res.status(200).json({
      status: true,
      message: "Welcome To Trippa API",
    });
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UserDocument = req.body;
      if (!body.email || !body.password) {
        const err = HandleError.badRequest(
          false,
          "Missing required fields: email, password"
        );
        return res.status(err.statusCode).json({ error: err });
      }

      const userExists = await userService.getUserByEmail(body.email);

      if (userExists) {
        const err = HandleError.conflict(false, "User already exists");
        return res.status(err.statusCode).json({ error: err });
      }

      body.password = await Helpers.hashPassword(body.password);

      const user = await userService.createUser(body);

      if (!user) {
        const err = HandleError.internal(false, "Error creating user");
        return res.status(err.statusCode).json({ error: err });
      }

      res.status(201).json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UserDocument = req.body;
      if (!body.email || !body.password) {
        const err = HandleError.badRequest(
          false,
          "Missing required fields: email, password"
        );
        return res.status(err.statusCode).json({ error: err });
      }

      const user = await userService.getUserByEmail(body.email);

      if (!user) {
        const err = HandleError.notFound(false, "User not found");
        return res.status(err.statusCode).json({ error: err });
      }

      const isMatch = await Helpers.comparePassword(
        body.password,
        user.password
      );

      if (!isMatch) {
        const err = HandleError.unauthorized(false, "Invalid credentials");
        return res.status(err.statusCode).json({ error: err });
      }

      const tokenPayload: JwtPayload = {
        userId: user._id,
        email: user.email,
      };

      const token = new JwtUtil(process.env.JWT_SECRET as string).sign(
        tokenPayload,
        { expiresIn: "2h" }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
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
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UserDocument = req.body;
      const id = req.params.id;

      if (!id) {
        const err = HandleError.badRequest(
          false,
          "Missing required fields: id"
        );
        return res.status(err.statusCode).json({ error: err });
      }

      const user = await userService.updateUser(id, body);

      if (!user) {
        const err = HandleError.notFound(false, "User not found");
        return res.status(err.statusCode).json({ error: err });
      }

      user.password = "";

      res.status(200).json({
        status: true,
        message: "User updated statusfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id) {
        const err = HandleError.badRequest(
          false,
          "Missing required fields: id"
        );
        return res.status(err.statusCode).json({ error: err });
      }

      const isDeleted = await userService.deleteUser(id);

      if (!isDeleted) {
        const err = HandleError.notFound(false, "User not found");
        return res.status(err.statusCode).json({ error: err });
      }

      res.status(200).json({
        status: true,
        message: "User deleted statusfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async forgetPasswordRequest(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email) {
      const err = HandleError.badRequest(
        false,
        "Missing required fields: email."
      );
      return res.status(err.statusCode).json({ error: err });
    }
    const user = await userService.getUserByEmail(email);
    if (user) {
      //console.log(user, "user");
      let token = await tokenService.checkIfUsertokenExists(user?.email);

      // console.log(token, " this is the token");
      if (token) await tokenService.deleteToken(token?._id);
      let resetToken = crypto.randomBytes(24).toString("hex");
      let hashedToken = await Helpers.hashToken(resetToken);

      const newToken: tokenDocument = new Token({
        userID: user?.email,
        token: hashedToken,
        createdAt: Date.now(),
      });
      try {
        await userService.createToken(newToken);

        const resetUrl = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/auth/reset-password/${resetToken}`;

        //await Helpers.sendEmail(user?.email, user?.name as string, resetUrl);

        res.status(200).json({
          status: true,
          message: "Link for password reset has been sent to your email",
          data: [],
        });
      } catch (error) {
        const err = HandleError.internal(
          false,
          "An error occurred, please try again"
        );
        res.status(err.statusCode).json({ error: err });
      }
    } else {
      const err = HandleError.notFound(false, "User does not exist");
      res.status(err.statusCode).json({ error: err });
    }
  }
}

export default UserController;
