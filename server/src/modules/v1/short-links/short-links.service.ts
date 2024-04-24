import {
	AnyColumn,
	InferInsertModel,
	InferSelectModel,
	eq,
	sql,
} from "drizzle-orm";

import { db } from "@/db/db-connection.js";
import { shortLinks } from "@/db/models/schema.js";

export async function createShortLink(
	data: InferInsertModel<typeof shortLinks>,
) {
	const result = await db.insert(shortLinks).values(data).returning();

	return result[0];
}

const increment = (column: AnyColumn, value = 1) => {
	return sql`${column} + ${value}`;
};

export async function getShortLinkBySlug(
	slug: InferSelectModel<typeof shortLinks>["slug"],
) {
	const result = await db
		.update(shortLinks)
		.set({
			totalClicks: increment(shortLinks.totalClicks),
		})
		.where(eq(shortLinks.slug, slug))
		.returning();

	return result[0];
}

export async function getShortLinkAnalyticsBySlug(
	slug: InferSelectModel<typeof shortLinks>["slug"],
) {
	const result = await db
		.select()
		.from(shortLinks)
		.where(eq(shortLinks.slug, slug));

	return result[0];
}

export async function getShortLinksByUserId(userId: string) {
	const result = await db
		.select()
		.from(shortLinks)
		.where(eq(shortLinks.createdByUserId, userId));

	return result;
}

export async function updateShortLinkSlug(
	slug: InferSelectModel<typeof shortLinks>["slug"],
	newSlug: InferSelectModel<typeof shortLinks>["slug"],
) {
	const result = await db
		.update(shortLinks)
		.set({
			slug: newSlug,
		})
		.where(eq(shortLinks.slug, slug))
		.returning();

	return result[0];
}

export async function deleteShortLink(
	slug: InferSelectModel<typeof shortLinks>["slug"],
) {
	const result = await db
		.delete(shortLinks)
		.where(eq(shortLinks.slug, slug))
		.returning();

	return result[0];
}
