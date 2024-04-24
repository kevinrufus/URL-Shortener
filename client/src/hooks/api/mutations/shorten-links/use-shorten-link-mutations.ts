import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { authApi } from "@/utils/api";

const ShortenLinkCreateApiSchema = z.object({
  id: z.string(),
  slug: z.string(),
  originalUrl: z.string(),
  totalClicks: z.number(),
  createdByUserId: z.string().nullable(),
  createdAt: z.string(),
  isDeleted: z.boolean(),
});

type ShortenLinkCreatePayload = z.infer<typeof ShortenLinkCreateApiSchema>;

const createShortLink = async (
  originalUrl: string
): Promise<ShortenLinkCreatePayload> => {
  const res = await authApi(`/short-links/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl }),
  });

  const validatedResponse = ShortenLinkCreateApiSchema.safeParse(res);

  if (!validatedResponse.success) {
    throw new Error(
      `Failed to create short link. ${validatedResponse.error.message}`
    );
  }

  return validatedResponse.data;
};

export const useShortenLinkCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["short-links"],
      });
    },
  });
};

const ShortenLinkUpdateApiSchema = z.object({
  id: z.string(),
  slug: z.string(),
  originalUrl: z.string(),
  totalClicks: z.number(),
  createdByUserId: z.string().nullable(),
  createdAt: z.string(),
  isDeleted: z.boolean(),
});

type ShortenLinkUpdatePayload = z.infer<typeof ShortenLinkUpdateApiSchema>;

const updateShortLink = async ({
  slug,
  newSlug,
}: {
  slug: string;
  newSlug: string;
}): Promise<ShortenLinkUpdatePayload> => {
  const res = await authApi(`/short-links/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newSlug }),
  });

  const validatedResponse = ShortenLinkUpdateApiSchema.safeParse(res);

  if (!validatedResponse.success) {
    throw new Error(
      `Failed to update short link. ${validatedResponse.error.message}`
    );
  }

  return validatedResponse.data;
};

export const useShortenLinkUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["short-links"],
      });
    },
  });
};

const deleteShortLink = async (slug: string) => {
  return await authApi(`/short-links/${slug}`, {
    method: "DELETE",
  });
};

export const useShortenLinkDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["short-links"],
      });
    },
  });
};
