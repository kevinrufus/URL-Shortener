import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { authApi } from "@/utils/api";

const ShortenedLinksApiSchema = z.array(
  z.object({
    id: z.string(),
    slug: z.string(),
    originalUrl: z.string(),
    totalClicks: z.number(),
    createdByUserId: z.string().nullable(),
    createdAt: z.string(),
    isDeleted: z.boolean(),
  })
);

type ShortenLinkPayload = z.infer<typeof ShortenedLinksApiSchema>;

const getShortLinks = async (): Promise<ShortenLinkPayload> => {
  const res = await authApi(`/short-links/user-id/current`);

  const validatedResponse = ShortenedLinksApiSchema.safeParse(res);

  if (!validatedResponse.success) {
    throw new Error(
      `Failed to get short links. ${validatedResponse.error.message}`
    );
  }

  return validatedResponse.data;
};

export const useShortenLinkQuery = () =>
  useQuery({
    queryKey: ["short-links"],
    queryFn: getShortLinks,
  });
