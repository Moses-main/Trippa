import { Document, Schema, model } from "mongoose";

export interface tokenDocument extends Document {
  userID: string;
  token: string;
}

const tokenSchema = new Schema<tokenDocument>(
  {
    userID: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = model<tokenDocument>("Token", tokenSchema);

export default Token;
