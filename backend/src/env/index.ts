/* eslint-disable @typescript-eslint/naming-convention */
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  MONGO_HOST: z.string(),
  MONGO_PORT: z.coerce.number().default(27017),
  MONGO_DB_NAME: z.string(),
  REDIS_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
