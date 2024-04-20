import express, { Application } from "express";
import cors from "cors";
import { json } from "body-parser";
import { connectDB, getDb } from "./config/database";
import router from "./routes/routes";
import { Db } from "mongodb";
import { UserService } from "./services/user.services";
import { TokenService } from "./services/token_request.services";
import userRouter from './routes/userRoutes'

let db: Db;
let userService: UserService;
let tokenService: TokenService;
class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this.app.use(cors());
    this.app.use(json());
  }

  private setupRoutes() {
    // Use api/v1/ prefix for all routes
    this.app.use("/api/v1/", router);
    this.app.use("/api/users", userRouter);
  }
  public async start() {
    try {
      await connectDB();
      db = getDb();
      userService = new UserService(db);
      tokenService = new TokenService(db);

      const port = process.env.PORT || 3000;
      this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  }
}

export { db, userService, tokenService };
export default Server;
