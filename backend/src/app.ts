import fastify from "fastify";
import { urlRoutes } from "./http/controllers/url/routes";
import { ZodError, z  } from "zod";

export const app = fastify();

app.register(urlRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: z.treeifyError(error) })
  }

  return reply.status(500).send({ message: 'Internal serve error' })
})