import { create } from "./create";
import { FastifyInstance } from "fastify";

export async function urlRoutes(app: FastifyInstance) {
  app.post("/url", create);
}
