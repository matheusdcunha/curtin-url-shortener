import { FastifyInstance } from "fastify";
import { redirect } from "./redirect";
import { create } from "./create";

export async function urlRoutes(app: FastifyInstance) {
  app.post("/url", create);
  app.get("/:code", redirect);
}
