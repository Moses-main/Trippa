import bcrypt from "bcrypt";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
export default class Helpers {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static async hashToken(token: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(token, salt);
    return hash;
  }
}
