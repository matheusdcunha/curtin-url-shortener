import { UrlInterface, UrlModel } from "@/models/url";
import { UrlRepository } from "@/repositories/url-repository";

export class MongoUrlRepository implements UrlRepository {
  async findByShortCode(code: string): Promise<UrlInterface | null> {
    const url = await UrlModel.findOne({ short_code: code }).lean();

    return url;
  }

  async saveUrl(
    urlData: Omit<UrlInterface, "created_at">
  ): Promise<UrlInterface> {
    const newUrl = new UrlModel(urlData);
    await newUrl.save();

    return newUrl;
  }
}
