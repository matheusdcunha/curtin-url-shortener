import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRedirectUrlUseCase } from "@/use-cases/factories/make-redirect-url-use-case";

export async function redirect(request: FastifyRequest, reply: FastifyReply) {
  const redirectUrlParamsSchema = z.object({
    code: z.string(),
  });

  const { code } = redirectUrlParamsSchema.parse(request.params);

  const redirectUseCase = makeRedirectUrlUseCase();

  const data = await redirectUseCase.execute({ code });

  if (!data) {
    return reply.status(404).send({ error: "URL not found." });
  }

  return reply.redirect(data.original_url, 307);
}
