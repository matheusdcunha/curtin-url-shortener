import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateUrlUseCase } from "@/use-cases/factories/make-create-url-use-case";
import { UrlSaveError } from "@/use-cases/erros/url-save-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUrlBodySchema = z.object({
    url: z.url(),
  });

  const { url } = createUrlBodySchema.parse(request.body);

  const createUrlUseCase = makeCreateUrlUseCase();

  try {
    const { data } = await createUrlUseCase.execute({ url });
    return reply.status(201).send({ code: data.short_code });
  } catch (error) {
    if (error instanceof UrlSaveError) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}
