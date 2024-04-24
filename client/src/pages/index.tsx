import { z } from "zod";
import validator from "validator";
import { Button } from "@nextui-org/react";

import { Form } from "@/components/ui/form";
import ShortLinkCard from "@/components/short-link-card";
import { useShortenLinkGuestMutation } from "@/hooks/api/mutations/shorten-links/use-shorten-link-guest-mutation";

import { RightArrowIcon } from "@/assets/svgs/icons/right-arrow-icon";
import { DownLeftArrowIcon } from "@/assets/svgs/icons/down-left-arrow-icon";
import { LinkIcon } from "@/assets/svgs/icons/link-icon";
import { Link } from "react-router-dom";

export default function Home() {
  const { mutate, data, isPending, isSuccess, isError, error } =
    useShortenLinkGuestMutation();

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

  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
      </div>
      <div className="flex py-10 justify-center min-h-dvh md:items-center">
        <div className="pt-4">
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <Link to={"/login"} className="mb-8 flex">
              <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
                <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
                  Create an account ⚡️
                  <span className="inline-flex items-center pl-2 text-black dark:text-white">
                    Get Started
                    <RightArrowIcon className="pl-0.5 text-black dark:text-white" />
                  </span>
                </div>
              </span>
            </Link>
            <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl px-3 md:px-0">
              Shorten Your Links,
              <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                Simplify Sharing
              </span>
            </h2>
            <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 px-5 md:px-1">
              Effortlessly streamline your online presence. Say goodbye to
              cumbersome URLs and hello to seamless sharing experiences. Join us
              in <span className="cursor-wait opacity-70">simplifying</span> the
              way you connect and communicate online.
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
                      isLoading={isPending}
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

            {isSuccess && data.slug && (
              <ShortLinkCard
                shortLink={data.slug}
                originalLink={data.originalUrl}
              />
            )}

            {isError && <p className="py-5 text-red-500">{error.message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
