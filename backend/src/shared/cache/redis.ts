import Redis from "ioredis";
import { env } from "@/env";

const redisConfig = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,

  maxRetriesPerRequest: null,
};

export const redisClient = new Redis(redisConfig);

redisClient.on("connect", () => {
  console.log("✅ Conectado com sucesso ao Redis.");
});

redisClient.on("error", (err) => {
  console.error("❌ Erro de conexão com o Redis:", err);
});
