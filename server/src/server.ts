import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";

import { env } from "@/config/env.js";
import { loggerConfig } from "@/config/logger.js";
import router from "@/modules/v1/routes.js";

import { getShortLinkBySlugJsonSchema } from "@/modules/v1/short-links/short-links.schema";
import { shortLinkRedirectHandler } from "@/modules/v1/short-links/short-links.controller";

export async function createServer() {
	const app = Fastify({
		logger: env.NODE_ENV ? loggerConfig[env.NODE_ENV] : true,
	});

	await app.register(cors, {
		origin: env.CORS_ORIGIN,
	});

	await app.register(helmet);
	await app.register(rateLimit, {
		max: 60,
		timeWindow: 60 * 1000,
	});

	await app.register(jwt, { secret: env.JWT_SECRET_KEY });

	app.register(router, { prefix: "/api/v1" });

	app.get(
		"/:slug",
		{ schema: getShortLinkBySlugJsonSchema },
		shortLinkRedirectHandler,
	);

	app.get("/healthcheck", () => {
		return {
			status: "ok",
			port: env.PORT,
		};
	});

	return app;
}
