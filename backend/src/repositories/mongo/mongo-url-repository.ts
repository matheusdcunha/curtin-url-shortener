import { UrlInterface, UrlModel } from "@/models/url";
import { UrlRepository, SaveUrlParams } from "@/repositories/url-repository";

export class MongoUrlRepository implements UrlRepository {
  async findByShortCode(code: string): Promise<UrlInterface | null> {
    const url = await UrlModel.findOne({ short_code: code }).lean();

    return url;
  }

  async saveUrl(urlData: SaveUrlParams): Promise<UrlInterface> {
    try {
      const newUrl = await UrlModel.create(urlData);
      return newUrl;
    } catch (error: any) {
      if (error.code === 11000) {
        const existingUrl = await UrlModel.findOne({ short_code: urlData.short_code }).lean();
        if(existingUrl) return existingUrl;
      }
      throw error;
    }
  }
}
