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

describe("[E2E] POST /url", () => {
  it("should create a short code for a valid URL", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/url",
      payload: { url: "https://www.google.com/" },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body).toHaveProperty("code");
    expect(typeof body.code).toBe("string");
    expect(body.code.length).toBeGreaterThan(0);
  });

  it("should return error for invalid URL", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/url",
      payload: { url: "not-a-url" },
    });

    expect(response.statusCode).toBe(500);
  });
});
