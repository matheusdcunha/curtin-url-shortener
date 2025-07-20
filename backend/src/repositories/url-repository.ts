import { UrlInterface } from "@/models/url";

export type UrlInterfaceMinimal = Pick<
  UrlInterface,
  "short_code" | "original_url" | "expires_at" | "created_at"
>;

export interface SaveUrlParams {
  short_code: string;
  original_url: string;
  expires_at: Date;
}

export interface UrlRepository {
  findByShortCode(
    code: string
  ): Promise<UrlInterfaceMinimal | UrlInterface | null>;
  saveUrl(urlData: SaveUrlParams): Promise<UrlInterfaceMinimal | UrlInterface>;
}
