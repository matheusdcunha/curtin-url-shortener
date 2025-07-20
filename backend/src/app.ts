import fastify from "fastify";
import { urlRoutes } from "./http/controllers/url/routes";

export const app = fastify();

app.register(urlRoutes);
