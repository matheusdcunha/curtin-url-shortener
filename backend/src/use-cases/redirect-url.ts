import { UrlRepository } from "@/repositories/url-repository";

interface RedirectUrlUseCaseRequest {
  code: string;
}

interface RedirectUrlUseCaseResponse {
  original_url: string;
}

export class RedirectUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute({
    code,
  }: RedirectUrlUseCaseRequest): Promise<RedirectUrlUseCaseResponse | null> {
    const data = await this.urlRepository.findByShortCode(code);

    if (data) {
      const { original_url } = data;
      return { original_url };
    }

    return null;
  }
}
