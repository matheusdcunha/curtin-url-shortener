process.env.MONGO_DB_NAME = "curtin_url_shortener_test";

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "@/app";
import { connectDB } from "@/database/mongoose";
import mongoose from "mongoose";
import { redisClient } from "@/shared/cache/redis";

beforeAll(async () => {
  await connectDB();
  await app.ready();
});
beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});
afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
  await redisClient.flushall();
  await redisClient.quit();
  await app.close();
});

describe("[E2E] GET /:code", () => {
  it("should redirect to the original URL from the code", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/url",
      payload: { url: "https://www.youtube.com/" },
    });
    expect(createResponse.statusCode).toBe(201);
    const { code } = createResponse.json();

    const redirectResponse = await app.inject({
      method: "GET",
      url: `/${code}`,
    });
    expect(redirectResponse.statusCode).toBe(307);
    expect(redirectResponse.headers.location).toBe("https://www.youtube.com/");
  });

  it("should return 404 for a non-existent code", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/non-existent-code",
    });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty("error");
  });
});
