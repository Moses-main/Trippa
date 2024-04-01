"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = exports.userService = exports.db = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes/routes"));
const user_services_1 = require("./services/user.services");
const token_request_services_1 = require("./services/token_request.services");
let db;
let userService;
let tokenService;
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddlewares();
        this.setupRoutes();
    }
    setupMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, body_parser_1.json)());
    }
    setupRoutes() {
        // Use api/v1/ prefix for all routes
        this.app.use("/api/v1/", routes_1.default);
    }
    async start() {
        try {
            await (0, database_1.connectDB)();
            exports.db = db = (0, database_1.getDb)();
            exports.userService = userService = new user_services_1.UserService(db);
            exports.tokenService = tokenService = new token_request_services_1.TokenService(db);
            const port = process.env.PORT || 3000;
            this.app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
        catch (error) {
            console.error("Error starting server:", error);
            process.exit(1);
        }
    }
}
exports.default = Server;
