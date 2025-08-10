import Redis from "ioredis";
import { env } from "@/env";

export const redisClient = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null, });

redisClient.on("connect", () => {
  console.log("✅ Conectado com sucesso ao Redis.");
});

redisClient.on("error", (err) => {
  console.error("❌ Erro de conexão com o Redis:", err);
});
