/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/extensions
import { env } from "@/env";
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const mongoURI = `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${process.env.MONGO_DB_NAME || env.MONGO_DB_NAME}`;

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Conectado com sucesso ao MongoDB.");
  } catch (error) {
    console.error("❌ Erro ao conectar com o MongoDB:", error);
  }
};
