import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
}

class JwtUtil {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(payload: JwtPayload, options: jwt.SignOptions): string {
    return jwt.sign(payload, this.secret, {
      ...options,
      algorithm: "HS256",
      issuer: "Trippa",
    });
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}

export default JwtUtil;
