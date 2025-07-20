import { Redis } from "ioredis";
import { UrlInterface } from "@/models/url";
import {
  UrlRepository,
  SaveUrlParams,
  UrlInterfaceMinimal,
} from "../url-repository";

export class RedisUrlRepository implements UrlRepository {
  private cacheKeyPrefix = "url:";

  private cacheTime = 5 * 24 * 60 * 60; // 5 days in second
  private cacheTTL = this.cacheTime;

  constructor(
    private decoratedRepository: UrlRepository,
    private redisClient: Redis
  ) {}

  async findByShortCode(
    code: string
  ): Promise<UrlInterface | UrlInterfaceMinimal | null> {
    const cacheKey = `${this.cacheKeyPrefix}${code}`;

    try {
      const cachedData = await this.redisClient.get(cacheKey);
      if (cachedData) {
        console.log("CACHE HIT!");
        return JSON.parse(cachedData) as UrlInterface;
      }
    } catch (error) {
      console.error("Erro ao acessar o cache Redis:", error);
    }

    console.log("CACHE MISS!");
    const urlFromDb = await this.decoratedRepository.findByShortCode(code);

    if (urlFromDb) {
      try {
        await this.redisClient.set(
          cacheKey,
          JSON.stringify(urlFromDb),
          "EX",
          this.cacheTTL
        );
      } catch (error) {
        console.error("Erro ao salvar no cache Redis:", error);
      }
    }

    return urlFromDb;
  }

  async saveUrl(
    urlData: SaveUrlParams
  ): Promise<UrlInterface | UrlInterfaceMinimal> {
    return this.decoratedRepository.saveUrl(urlData);
  }
}
