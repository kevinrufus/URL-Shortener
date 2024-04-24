import { FastifyReply, FastifyRequest } from "fastify";
import {
	createShortLinkRequestBodyType,
	getShortLinkBySlugRequestParamsType,
	getShortLinkByUserIdRequestParamsType,
	updateShortLinkSlugRequestBodyType,
	updateShortLinkSlugRequestParamsType,
} from "./short-links.schema.js";
import {
	createShortLink,
	deleteShortLink,
	getShortLinkAnalyticsBySlug,
	getShortLinkBySlug,
	getShortLinksByUserId,
	updateShortLinkSlug,
} from "./short-links.service.js";
import { nanoid } from "nanoid";

export async function createShortLinkHandler(
	req: FastifyRequest<{ Body: createShortLinkRequestBodyType }>,
	res: FastifyReply,
) {
	const linkReqData = req.body;

	const generatedSlug = nanoid(10);

	const linkData = {
		...linkReqData,
		createdByUserId: req.user && req.user.id,
		slug: generatedSlug,
	};

	const link = await createShortLink(linkData);

	if (!link) {
		res.code(404);
		return { message: "Short Link creation unsuccessful" };
	}

	return link;
}

export async function getCurrentUserShortLinksHandler(
	req: FastifyRequest,
	res: FastifyReply,
) {
	const { id } = req.user;

	const links = await getShortLinksByUserId(id);

	if (!links) {
		res.code(404);
		return {
			message: "Failed to get short links",
		};
	}

	return links;
}

export async function getShortLinksByUserIdHandler(
	req: FastifyRequest<{
		Params: getShortLinkByUserIdRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { createdByUserId } = req.params;

	const links = await getShortLinksByUserId(createdByUserId);

	if (!links || links.length === 0) {
		res.code(404);
		return {
			message: "No Short Links found with the provided User Id",
		};
	}

	return links;
}

export async function shortLinkRedirectHandler(
	req: FastifyRequest<{
		Params: getShortLinkBySlugRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { slug } = req.params;

	const link = await getShortLinkBySlug(slug);

	if (!link) {
		res.code(404);
		return {
			message: "Slug not found",
		};
	}

	res.redirect(link.originalUrl);

	return;
}

export async function getShortLinkBySlugHandler(
	req: FastifyRequest<{
		Params: getShortLinkBySlugRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { slug } = req.params;

	const link = await getShortLinkBySlug(slug);

	if (!link) {
		res.code(404);
		return {
			message: "Slug not found",
		};
	}

	return link;
}

export async function updateShortLinkSlugHandler(
	req: FastifyRequest<{
		Params: updateShortLinkSlugRequestParamsType;
		Body: updateShortLinkSlugRequestBodyType;
	}>,
	res: FastifyReply,
) {
	const { slug } = req.params;
	const { newSlug } = req.body;

	const link = await updateShortLinkSlug(slug, newSlug);

	if (!link) {
		res.code(404);
		return {
			message: "Slug not found",
		};
	}

	return link;
}

export async function getShortLinkAnalyticsBySlugHandler(
	req: FastifyRequest<{
		Params: getShortLinkBySlugRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { slug } = req.params;

	const links = await getShortLinkAnalyticsBySlug(slug);

	if (!links) {
		res.code(404);
		return {
			message: "Invalid Slug provided",
		};
	}

	return links;
}

export async function deleteShortLinkHandler(
	req: FastifyRequest<{
		Params: getShortLinkBySlugRequestParamsType;
	}>,
	res: FastifyReply,
) {
	const { slug } = req.params;

	const links = await deleteShortLink(slug);

	if (!links) {
		res.code(404);
		return {
			message: "Invalid Slug provided",
		};
	}

	return links;
}
