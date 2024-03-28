import { UserDocument } from "../models/user.models";
import { tokenDocument } from "../models/token.models";
import { ObjectId, Db } from "mongodb";

export class UserService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createUser(user: UserDocument): Promise<UserDocument> {
    const result = await this.db
      .collection<UserDocument>("users")
      .insertOne(user);
    return { ...user, _id: result.insertedId.toString() } as UserDocument;
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    const result = await this.db
      .collection<UserDocument>("users")
      .findOne({ _id: new ObjectId(id) });
    return result ? { ...result, _id: result._id.toString() } : null;
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    const result = await this.db
      .collection<UserDocument>("users")
      .findOne({ email });
    return result ? { ...result, _id: result._id.toString() } : null;
  }

  async updateUser(
    id: string,
    user: UserDocument
  ): Promise<UserDocument | null> {
    const result = await this.db
      .collection<UserDocument>("users")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: user },
        { returnDocument: "after", projection: { password: 0 } }
      );

    // return result.value
    //   ? { ...result.value, _id: result.value._id.toString() }
    //   : null;

    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.db
      .collection<UserDocument>("users")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async createToken(token: tokenDocument): Promise<tokenDocument | null> {
    const result = await this.db
      .collection<tokenDocument>("request_token")
      .insertOne(token);
    return { ...token, _id: result.insertedId.toString() } as tokenDocument;
  }
}
