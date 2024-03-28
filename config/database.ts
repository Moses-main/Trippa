import { MongoClient, Db, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db: Db;
const MONGO_URI = process.env.MONGO_URI as string;
console.log(MONGO_URI, " this is the mongo uri");

export const connectDB = async (): Promise<Db> => {
  try {
    const client = await MongoClient.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as MongoClientOptions);
    db = client.db(process.env.DB_NAME as string);
    console.log("\x1b[32m%s\x1b[0m", "Database connected");
    return db;
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Database connection failed");
    console.error(error);
    process.exit(1);
  }
};

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDb first.");
  }
  return db;
}
