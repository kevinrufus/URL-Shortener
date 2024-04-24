import type { FastifyInstance } from "fastify";
import {
	createShortLinkJsonSchema,
	getShortLinkBySlugJsonSchema,
	getShortLinkByUserIdJsonSchema,
	updateShortLinkSlugJsonSchema,
} from "./short-links.schema.js";
import {
	createShortLinkHandler,
	deleteShortLinkHandler,
	getCurrentUserShortLinksHandler,
	getShortLinkAnalyticsBySlugHandler,
	getShortLinksByUserIdHandler,
	updateShortLinkSlugHandler,
} from "./short-links.controller.js";

export default async function shortLinkRouter(router: FastifyInstance) {
	router.post(
		"/create",
		{ schema: createShortLinkJsonSchema },
		createShortLinkHandler,
	);

	router.get("/user-id/current", getCurrentUserShortLinksHandler);

	router.get(
		"/user-id/:createdByUserId",
		{ schema: getShortLinkByUserIdJsonSchema },
		getShortLinksByUserIdHandler,
	);

	router.get(
		"/:slug/analytics",
		{ schema: getShortLinkBySlugJsonSchema },
		getShortLinkAnalyticsBySlugHandler,
	);

	router.delete(
		"/:slug",
		{ schema: getShortLinkBySlugJsonSchema },
		deleteShortLinkHandler,
	);

	router.patch(
		"/:slug",
		{ schema: updateShortLinkSlugJsonSchema },
		updateShortLinkSlugHandler,
	);
}
