export default class HandleError extends Error {
  public statusCode: number;
  public status: boolean;
  public message: string;
  public data: any;

  constructor(
    statusCode: number,
    status: boolean,
    message: string,
    data?: any
  ) {
    super();
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static badRequest(status: boolean, message: string, data?: any) {
    return new HandleError(400, status, message, data);
  }

  static unauthorized(status: boolean, message: string, data?: any) {
    return new HandleError(401, status, message, data);
  }

  static forbidden(status: boolean, message: string, data?: any) {
    return new HandleError(403, status, message, data);
  }

  static notFound(status: boolean, message: string, data?: any) {
    return new HandleError(404, status, message, data);
  }

  static internal(status: boolean, message: string, data?: any) {
    return new HandleError(500, status, message, data);
  }

  static conflict(status: boolean, message: string, data?: any) {
    return new HandleError(409, status, message, data);
  }
}
