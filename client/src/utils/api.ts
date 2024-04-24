import { env } from "@/config/env";
import { localStorageFn } from "@/utils/localstorage";

export class HTTPError extends Error {
  constructor(
    public response: Response,
    payload: string
  ) {
    super(`HTTP error ${response.status}: ${payload}`);
  }
}

export async function api<ResponseType = any>(
  url: string,
  options: RequestInit = {},
  baseUrl: boolean = true
) {
  const result = await fetch(
    `${baseUrl ? env.BASE_API_URL + url : url}`,
    options
  );

  if (!result.ok) {
    const errMsg = await result.json();

    throw new HTTPError(result, errMsg?.message);
  }

  return (await result.json()) as ResponseType;
}

export async function authApi<ResponseType = any>(
  url: string,
  options: RequestInit = {}
) {
  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorageFn.getItem("token")}`,
    },
  };

  return api<ResponseType>(url, authOptions);
}
