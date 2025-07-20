import { app } from "./app";
import { env } from "./env";
import { connectDB } from "./database/mongoose";
import { redisClient } from "./shared/cache/redis";

const startServer = async () => {
  try {
    await connectDB();

    const port = env.PORT;
    await app.listen({
      host: "0.0.0.0",
      port,
    });

    console.log(`🌊 HTTP Server Running on port: ${port}!`);
    console.log("Status inicial do Redis Client:", redisClient.status);
  } catch (error) {
    console.error("❌ Falha ao iniciar o servidor", error);
    process.exit(1);
  }
};

startServer();
