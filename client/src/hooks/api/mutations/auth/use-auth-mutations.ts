import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/utils/api";

// Login
const LoginApiSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().nullable(),
    role: z.string(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  token: z.string(),
});

type LoginApiPayload = z.infer<typeof LoginApiSchema>;

const login = async (data: {
  username: string;
  password: string;
}): Promise<LoginApiPayload> => {
  const res = await api(`/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const validatedResponse = LoginApiSchema.safeParse(res);

  if (!validatedResponse.success) {
    throw new Error(`Failed to login. ${validatedResponse.error.message}`);
  }

  return validatedResponse.data;
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

// Register
const RegisterApiSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().nullable(),
    role: z.string(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  token: z.string(),
});

type RegisterApiPayload = z.infer<typeof RegisterApiSchema>;

const register = async (data: {
  username: string;
  password: string;
}): Promise<RegisterApiPayload> => {
  const res = await api(`/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const validatedResponse = RegisterApiSchema.safeParse(res);

  if (!validatedResponse.success) {
    throw new Error(`Failed to register. ${validatedResponse.error.message}`);
  }

  return validatedResponse.data;
};

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: register,
  });
