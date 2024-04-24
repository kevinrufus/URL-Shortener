import type { FastifyInstance } from "fastify";

import { loginUserJsonSchema, registerUserJsonSchema } from "./auth.schema.js";
import { loginHandler, registerHandler } from "./auth.controller.js";

export default async function authRouter(router: FastifyInstance) {
	router.post("/login", { schema: loginUserJsonSchema }, loginHandler);

	router.post("/register", { schema: registerUserJsonSchema }, registerHandler);
}
