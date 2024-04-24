import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { shortLinks } from "@/db/models/schema.js";

const createShortLinkTableSchema = createInsertSchema(shortLinks, {
	originalUrl: (schema) =>
		schema.originalUrl.refine(
			(value) =>
				/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi.test(
					value,
				),
			{
				message: "Please enter a valid URL",
			},
		),
});

const createShortLinkApiValidatorSchema = createShortLinkTableSchema.pick({
	originalUrl: true,
});

export type createShortLinkRequestBodyType = z.infer<
	typeof createShortLinkApiValidatorSchema
>;

export const createShortLinkJsonSchema = {
	body: zodToJsonSchema(
		createShortLinkApiValidatorSchema,
		"createShortLinkApiValidatorSchema",
	),
};

const selectShortLinkTableSchema = createSelectSchema(shortLinks, {
	createdByUserId: z.string().refine((value) => value !== null),
});

const getShortLinkByUserIdApiValidatorSchema = selectShortLinkTableSchema.pick({
	createdByUserId: true,
});

type NonNullObjKeys<T> = { [P in keyof T]: Extract<T[P], string> };

export type getShortLinkByUserIdRequestParamsType = NonNullObjKeys<
	z.infer<typeof getShortLinkByUserIdApiValidatorSchema>
>;

export const getShortLinkByUserIdJsonSchema = {
	params: zodToJsonSchema(
		getShortLinkByUserIdApiValidatorSchema,
		"getShortLinkByUserIdApiValidatorSchema",
	),
};

const getShortLinkBySlugApiValidatorSchema = selectShortLinkTableSchema.pick({
	slug: true,
});

export type getShortLinkBySlugRequestParamsType = z.infer<
	typeof getShortLinkBySlugApiValidatorSchema
>;

export const getShortLinkBySlugJsonSchema = {
	params: zodToJsonSchema(
		getShortLinkBySlugApiValidatorSchema,
		"getShortLinkBySlugApiValidatorSchema",
	),
};

const updateShortLinkSlugParamApiValidatorSchema =
	selectShortLinkTableSchema.pick({
		slug: true,
	});

const updateShortLinkSlugBodyApiValidatorSchema = z.object({
	newSlug: z
		.string()
		.min(4)
		.max(16)
		.regex(/^[A-Za-z0-9_-]+$/, {
			message: "Slug can only contain the following: A-Z, a-z, 0-9, _, -",
		}),
});

export type updateShortLinkSlugRequestParamsType = z.infer<
	typeof updateShortLinkSlugParamApiValidatorSchema
>;

export type updateShortLinkSlugRequestBodyType = z.infer<
	typeof updateShortLinkSlugBodyApiValidatorSchema
>;

export const updateShortLinkSlugJsonSchema = {
	params: zodToJsonSchema(
		updateShortLinkSlugParamApiValidatorSchema,
		"updateShortLinkSlugParamApiValidatorSchema",
	),
	body: zodToJsonSchema(
		updateShortLinkSlugBodyApiValidatorSchema,
		"updateShortLinkSlugBodyApiValidatorSchema",
	),
};
