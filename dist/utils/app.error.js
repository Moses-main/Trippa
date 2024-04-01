"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandleError extends Error {
    constructor(statusCode, status, message, data) {
        super();
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.data = data;
    }
    static badRequest(status, message, data) {
        return new HandleError(400, status, message, data);
    }
    static unauthorized(status, message, data) {
        return new HandleError(401, status, message, data);
    }
    static forbidden(status, message, data) {
        return new HandleError(403, status, message, data);
    }
    static notFound(status, message, data) {
        return new HandleError(404, status, message, data);
    }
    static internal(status, message, data) {
        return new HandleError(500, status, message, data);
    }
    static conflict(status, message, data) {
        return new HandleError(409, status, message, data);
    }
}
exports.default = HandleError;
