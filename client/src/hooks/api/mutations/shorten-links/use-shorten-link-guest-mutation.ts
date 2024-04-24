import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/utils/api";

const ShortenLinkGuestApiSchema = z.object({
  id: z.string(),
  slug: z.string(),
  originalUrl: z.string(),
  totalClicks: z.number(),
  createdByUserId: z.string().nullable(),
  createdAt: z.string(),
  isDeleted: z.boolean(),
});

type ShortenLinkGuestPayload = z.infer<typeof ShortenLinkGuestApiSchema>;

const createShortLink = async (
  originalUrl: string
): Promise<ShortenLinkGuestPayload> => {
  const res = await api(`/short-links/create/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl }),
  });

  const validatedResponse = ShortenLinkGuestApiSchema.safeParse(res);

  if (!validatedResponse.success) {
    throw new Error(
      `Failed to create short link. ${validatedResponse.error.message}`
    );
  }

  return validatedResponse.data;
};

export const useShortenLinkGuestMutation = () =>
  useMutation({
    mutationFn: createShortLink,
  });
