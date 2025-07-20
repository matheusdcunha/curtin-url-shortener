import { RedisUrlRepository } from "@/repositories/redis/redis-url-repository";
import { MongoUrlRepository } from "@/repositories/mongo/mongo-url-repository";
import { HashUrl } from "@/utils/hash-url";
import { CreateUrlUseCase } from "@/use-cases/create-url";
import { redisClient } from "@/shared/cache/redis";

export function makeCreateUrlUseCase() {
  const CODE_ENCRYPT_LENGTH = 6;
  const decoratedRepository = new MongoUrlRepository();
  const urlRepository = new RedisUrlRepository(
    decoratedRepository,
    redisClient
  );
  const hashUrl = new HashUrl(CODE_ENCRYPT_LENGTH);
  const service = new CreateUrlUseCase(urlRepository, hashUrl);

  return service;
}
