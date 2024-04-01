import { tokenDocument } from "../models/token.models";
import { ObjectId, Db } from "mongodb";

export class TokenService {
  private db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  async checkIfUsertokenExists(email: string): Promise<tokenDocument | null> {
    const result = await this.db
      .collection<tokenDocument>("request_token")
      .findOne({ userID: email });
    return result?._id ? { ...result, _id: result?._id } : null;
  }
  async deleteToken(id: string): Promise<boolean> {
    const result = await this.db
      .collection<tokenDocument>("request_token")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
