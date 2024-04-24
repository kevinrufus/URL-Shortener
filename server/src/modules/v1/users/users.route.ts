import type { FastifyInstance } from "fastify";

import {
	createUserHandler,
	getCurrentUserHandler,
	getUserByIdHandler,
	getUsersByRoleHandler,
	getUsersHandler,
} from "./users.controller.js";
import {
	createUserJsonSchema,
	getUserByIdJsonSchema,
	getUsersByRoleJsonSchema,
} from "./users.schema.js";

export default async function userRouter(router: FastifyInstance) {
	router.get("/current", getCurrentUserHandler);

	router.get("/all", getUsersHandler);

	router.get(
		"/role/:role",
		{ schema: getUsersByRoleJsonSchema },
		getUsersByRoleHandler,
	);

	router.get("/:id", { schema: getUserByIdJsonSchema }, getUserByIdHandler);

	router.post("/create", { schema: createUserJsonSchema }, createUserHandler);
}
