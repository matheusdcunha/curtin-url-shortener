import { UrlInterface } from "@/models/url";

export interface SaveUrlParams {
  short_code: string;
  original_url: string;
  expires_at: Date;
}

export interface UrlRepository {
  findByShortCode(code: string): Promise<UrlInterface | null>;
  saveUrl(urlData: SaveUrlParams): Promise<UrlInterface>;
}
