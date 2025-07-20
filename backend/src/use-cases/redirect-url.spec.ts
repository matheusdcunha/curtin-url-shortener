import { UrlRepository } from "@/repositories/url-repository";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { RedirectUrlUseCase } from "./redirect-url";
import { InMemoryUrlRepository } from "@/repositories/in-memory/in-memory-url-repository";

const DATE_LOCK = new Date("2022-02-08T10:00:00.000Z");

let urlRepository: UrlRepository;
let sut: RedirectUrlUseCase;

describe("Redirect Url Use Case", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(DATE_LOCK);

    urlRepository = new InMemoryUrlRepository();
    sut = new RedirectUrlUseCase(urlRepository);
  });

  it("should be able to redirect to a url by a short code", async () => {
    const code = "code123";
    const url = "https://www.google.com/";
    const expires_at = DATE_LOCK;
    expires_at.setDate(expires_at.getDate() + 5);

    await urlRepository.saveUrl({
      short_code: code,
      original_url: url,
      expires_at,
    });

    const data = await sut.execute({ code });

    expect(data?.original_url).toEqual(url);
  });

  it("should not be able to redirect to a url not existed", async () => {
    const code = "code123";

    const data = await sut.execute({ code });

    expect(data).toEqual(null);
  });
});
