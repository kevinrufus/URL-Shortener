import { z } from "zod";

const envSchema = z.object({
  BASE_API_URL: z.string().url(),
});

const envObj = {
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL as string,
};

export const env = envSchema.parse(envObj);
