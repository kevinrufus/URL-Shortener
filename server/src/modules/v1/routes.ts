import type { FastifyInstance } from "fastify";

import userRouter from "./users/users.route.js";
import authRouter from "./auth/auth.router.js";
import shortLinkRouter from "./short-links/short-links.route.js";
import {
	createShortLinkJsonSchema,
	getShortLinkBySlugJsonSchema,
} from "./short-links/short-links.schema.js";
import {
	createShortLinkHandler,
	getShortLinkBySlugHandler,
} from "./short-links/short-links.controller.js";

async function publicRoutes(router: FastifyInstance) {
	router.post(
		"/short-links/create/guest",
		{ schema: createShortLinkJsonSchema },
		createShortLinkHandler,
	);

	router.get(
		"/short-links/:slug",
		{ schema: getShortLinkBySlugJsonSchema },
		getShortLinkBySlugHandler,
	);

	router.register(authRouter, { prefix: "/auth" });
}

async function protectedRoutes(router: FastifyInstance) {
	router.addHook("onRequest", async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	});

	router.register(userRouter, { prefix: "/users" });
	router.register(shortLinkRouter, { prefix: "/short-links" });
}

export default async function router(router: FastifyInstance) {
	router.get("/", async () => {
		return { message: "Api v1 is running" };
	});

	router.register(publicRoutes);
	router.register(protectedRoutes);
}
