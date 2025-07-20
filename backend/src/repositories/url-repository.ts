import { UrlInterface } from "@/models/url";

export interface UrlRepository {
  findByShortCode(code: string): Promise<UrlInterface | null>;
  saveUrl(urlData: Omit<UrlInterface, "created_at">): Promise<UrlInterface>;
}
