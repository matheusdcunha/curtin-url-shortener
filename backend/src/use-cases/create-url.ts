import type { UrlInterface } from "@/models/url";
import { UrlRepository } from "@/repositories/url-repository";
import { HashUrl } from "@/utils/hash-url";

interface CreateUrlUseCaseRequest {
  url: string;
}

interface CreateUrlUseCaseResponse {
  data: UrlInterface;
}

export class CreateUrlUseCase {
  constructor(
    private urlRepository: UrlRepository,
    private hashUrl: HashUrl
  ) {}

  async execute({
    url,
  }: CreateUrlUseCaseRequest): Promise<CreateUrlUseCaseResponse> {
    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 5);

    const short_code = await this.hashUrl.execute(url);

    const data = await this.urlRepository.saveUrl({
      short_code,
      original_url: url,
      expires_at,
    });

    return { data };
  }
}
