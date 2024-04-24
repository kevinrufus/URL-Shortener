import { DownLeftArrowIcon } from "@/assets/svgs/icons/down-left-arrow-icon";
import { LinkIcon } from "@/assets/svgs/icons/link-icon";
import ShortLinkCard from "@/components/short-link-card";
import { Form } from "@/components/ui/form";
import { useShortenLinkCreateMutation } from "@/hooks/api/mutations/shorten-links/use-shorten-link-mutations";
import { useShortenLinkQuery } from "@/hooks/api/queries/shorten-links/use-shorten-link-query";
import { localStorageFn } from "@/utils/localstorage";
import { Button, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { z } from "zod";

export default function Dashboard() {
  const [user, _] = useState<{ username: string } | null>(
    localStorageFn.getItem("user") || null
  );
  const navigate = useNavigate();

  const {
    mutate,
    isPending: isPendingMutation,
    isError: isErrorMutation,
    error: mutationError,
  } = useShortenLinkCreateMutation();

  const { data: queryData, isPending: isPendingQuery } = useShortenLinkQuery();

  const onSubmit = async ({ url }: { url: string }) => {
    mutate(url);
  };

  const ShortLinkFormSchema = z.object({
    url: z
      .string()
      .min(3)
      .refine((value) => validator.isURL(value), {
        message: "Please enter a valid URL",
      }),
  });

  function logOut() {
    localStorageFn.removeItem("token");
    navigate("/");
  }

  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>
      <div className="relative flex py-28 justify-center min-h-dvh md:items-center md:py-2">
        <div className="absolute top-0 flex justify-end items-center py-3 px-5 w-full max-w-7xl">
          <Button
            onClick={logOut}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary-mz px-4 py-2 text-sm  text-primary-mz-foreground shadow transition-colors hover:bg-primary-mz/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          >
            Logout
          </Button>
        </div>
        <div className="pt-4 md:mt-0 w-full">
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl px-3 md:px-0">
              Hi,{" "}
              <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
                {user?.username}
              </span>
            </h2>
            <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 px-5 md:px-1">
              Manage your shortened links.
            </p>

            <Form
              onSubmit={onSubmit}
              schema={ShortLinkFormSchema}
              className="py-12"
            >
              {({ register, formState: { errors } }) => (
                <>
                  <div className="relative flex items-center">
                    <LinkIcon className="absolute inset-y-0 left-0 my-2 ml-3 w-5 text-gray-400" />
                    <input
                      placeholder="Enter your URL"
                      required={true}
                      className="peer block w-full rounded-md border border-gray-200 bg-white p-2 pl-10 pr-12 shadow-lg focus:border-black focus:outline-none focus:ring-0 sm:text-sm"
                      {...register("url")}
                    />
                    <Button
                      isLoading={isPendingMutation}
                      type="submit"
                      className="bg-transparent data-[hover=true]:border-gray-700 data-[hover=true]:text-gray-700 peer-focus:text-gray-700 absolute inset-y-0 right-0 h-auto my-1.5 mr-1.5 flex w-10 px-1 min-w-5 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400"
                    >
                      <DownLeftArrowIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.url && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.url.message}
                    </p>
                  )}
                </>
              )}
            </Form>

            <div className="w-full">
              {isPendingQuery ? (
                <div className="flex justify-center items-center w-full px-2">
                  <div className="relative flex items-center justify-between max-w-xl rounded-md border border-gray-200 py-3 px-3 md:px-6 shadow-lg w-full">
                    <div className="w-full flex flex-col gap-3 py-2">
                      <Skeleton className="h-3 rounded-lg" />
                      <Skeleton className="h-3 rounded-lg" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {queryData && queryData?.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {queryData?.map((data) => {
                        return (
                          <ShortLinkCard
                            key={data.id}
                            shortLink={data.slug}
                            originalLink={data.originalUrl}
                            isPublic={false}
                            linkClicks={data.totalClicks}
                          />
                        );
                      })}{" "}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      No short links generated
                    </div>
                  )}
                </>
              )}
            </div>

            {isErrorMutation && (
              <p className="py-5 text-red-500">{mutationError.message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
