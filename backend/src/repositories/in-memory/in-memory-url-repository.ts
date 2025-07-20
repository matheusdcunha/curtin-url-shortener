import {
  SaveUrlParams,
  UrlRepository,
  UrlInterfaceMinimal,
} from "@/repositories/url-repository";

export class InMemoryUrlRepository implements UrlRepository {
  public items: UrlInterfaceMinimal[] = [];

  async findByShortCode(code: string): Promise<UrlInterfaceMinimal | null> {
    const url = this.items.find((item) => item.short_code === code);

    if (!url) {
      return null;
    }

    return url;
  }
  async saveUrl(urlData: SaveUrlParams): Promise<UrlInterfaceMinimal> {
    const url = {
      short_code: urlData.short_code,
      original_url: urlData.original_url,
      expires_at: urlData.expires_at,
      created_at: new Date(),
    };

    this.items.push(url);

    return url;
  }
}
