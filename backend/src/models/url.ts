import { Schema, model, Document } from "mongoose";

export interface UrlInterface extends Document {
  short_code: string;
  original_url: string;
  created_at: Date;
  expires_at: Date;
}

const UrlSchema = new Schema<UrlInterface>({
  short_code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  original_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    required: true,
    index: { expires: "1s" },
  },
});

export const UrlModel = model<UrlInterface>("Url", UrlSchema);
