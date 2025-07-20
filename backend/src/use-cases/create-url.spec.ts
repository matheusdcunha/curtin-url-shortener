import { HashUrl } from "@/utils/hash-url";
import { UrlRepository } from "@/repositories/url-repository";
import { CreateUrlUseCase } from "./create-url";
import { InMemoryUrlRepository } from "@/repositories/in-memory/in-memory-url-repository";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { afterEach } from "node:test";

const CODE_ENCRYPT_LENGTH = 2;
const DATE_LOCK = new Date("2022-02-08T10:00:00.000Z");

let urlRepository: UrlRepository;
let hashUrl: HashUrl;
let sut: CreateUrlUseCase;

describe("Create Url Use  Case", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(DATE_LOCK);

    urlRepository = new InMemoryUrlRepository();
    hashUrl = new HashUrl(CODE_ENCRYPT_LENGTH);
    sut = new CreateUrlUseCase(urlRepository, hashUrl);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be abe to create a new shortener url", async () => {
    const url = "https://www.google.com/";
    const expiresDate = DATE_LOCK;
    expiresDate.setDate(expiresDate.getDate() + 5);

    const { data } = await sut.execute({
      url,
    });

    expect(data.short_code).toEqual(expect.any(String));
    expect(data.short_code.length).toEqual(CODE_ENCRYPT_LENGTH);
    expect(data.original_url).toEqual(url);
    expect(data.expires_at).toEqual(expiresDate);
  });
});
