import { RedisUrlRepository } from "@/repositories/redis/redis-url-repository";
import { MongoUrlRepository } from "@/repositories/mongo/mongo-url-repository";
import { RedirectUrlUseCase } from "../redirect-url";
import { redisClient } from "@/shared/cache/redis";

export function makeRedirectUrlUseCase() {
  const decoratedRepository = new MongoUrlRepository();
  const urlRepository = new RedisUrlRepository(
    decoratedRepository,
    redisClient
  );
  const service = new RedirectUrlUseCase(urlRepository);

  return service;
}
