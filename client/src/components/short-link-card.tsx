import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { z } from "zod";
import { toast } from "sonner";

import Input from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  useShortenLinkDeleteMutation,
  useShortenLinkUpdateMutation,
} from "@/hooks/api/mutations/shorten-links/use-shorten-link-mutations";
import { copyToClipboard } from "@/utils/clipboard";

import { AnalyticsBarIcon } from "@/assets/svgs/icons/analytics-bar-icon";
import { CopyIcon } from "@/assets/svgs/icons/copy-icon";
import { QRCodeIcon } from "@/assets/svgs/icons/qr-code-icon";
import { VerticalThreeDotsIcon } from "@/assets/svgs/icons/vertical-three-dots-icon";

export default function ShortLinkCard({
  isPublic = true,
  shortLink,
  originalLink,
  linkClicks,
}: {
  isPublic?: boolean;
  shortLink: string;
  originalLink: string;
  linkClicks?: number;
}) {
  const { mutate: deleteMutation, isPending: isPendindDelete } =
    useShortenLinkDeleteMutation();

  const { mutate: updateMutation, isPending: isPendindUpdate } =
    useShortenLinkUpdateMutation();

  const [isEdit, setIsEdit] = useState(false);

  const editShortLinkSlugSchema = z.object({
    slug: z
      .string()
      .min(4)
      .max(16)
      .regex(/^[A-Za-z0-9_-]+$/, {
        message: "Slug can only contain the following: A-Z, a-z, 0-9, _, -",
      }),
  });

  const onSubmit = (data: z.infer<typeof editShortLinkSlugSchema>) => {
    const toastId = toast.loading("Updating short link");

    updateMutation(
      { slug: shortLink, newSlug: data.slug },
      {
        onError: () => toast.error("Failed to update short link"),
        onSettled: () => toast.dismiss(toastId),
      }
    );
    setIsEdit(false);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full px-4">
        <div className="relative flex max-w-xl items-center justify-between rounded-md border border-gray-200 bg-white py-3 px-3 md:px-10 shadow-lg transition-[border-color] hover:border-black w-full">
          <div className="flex items-center md:space-x-3 pr-2 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center justify-between sm:space-x-2">
                {isEdit ? (
                  <div className="w-full pb-1">
                    <Form schema={editShortLinkSlugSchema} onSubmit={onSubmit}>
                      {({ register, formState: { errors } }) => (
                        <>
                          <Input
                            size="md"
                            radius="sm"
                            placeholder="Enter the new slug"
                            disabled={isPendindUpdate}
                            isInvalid={!!errors.slug}
                            errorMessage={errors?.slug?.message}
                            startContent={
                              <span className="text-sm pl-2">
                                {`${window.location.host}/`}
                              </span>
                            }
                            endContent={
                              <span
                                className="px-2 hover:cursor-pointer"
                                onClick={() => setIsEdit(false)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.2em"
                                  height="1.2em"
                                  viewBox="0 0 1024 1024"
                                >
                                  <path
                                    fill="currentColor"
                                    d="m466.752 512l-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
                                  ></path>
                                  <path
                                    fill="currentColor"
                                    d="M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896"
                                  ></path>
                                </svg>
                              </span>
                            }
                            {...register("slug")}
                          />
                        </>
                      )}
                    </Form>
                  </div>
                ) : (
                  <a
                    className="font-semibold text-blue-800 truncate"
                    href={shortLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`${window.location.origin}/${shortLink}`}
                  </a>
                )}
                {!isPublic && (
                  <div className="flex items-center space-x-1">
                    <Tooltip
                      content="Copy to clipboard"
                      placement="top"
                      offset={15}
                      isDisabled={isPendindDelete}
                    >
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${window.location.origin}/${shortLink}`
                          )
                        }
                        className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                      >
                        <span className="sr-only">Copy</span>
                        <CopyIcon className="text-gray-700 transition-all group-hover:text-blue-800" />
                      </button>
                    </Tooltip>
                    <button className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95">
                      <span className="sr-only">Show QR Code</span>
                      <QRCodeIcon className="h-4 w-4 text-gray-700 transition-all group-hover:text-blue-800" />
                    </button>
                    <div className="flex items-center sm:space-x-1 rounded-md bg-gray-100 px-2 py-0.5 text-gray-700 transition-all duration-75 hover:scale-105 active:scale-95">
                      <AnalyticsBarIcon className="h-4 w-4" />
                      <p className="text-sm flex">
                        {linkClicks &&
                          (linkClicks >= 1000
                            ? (linkClicks / 1000).toFixed(1) + "K"
                            : linkClicks.toString())}
                        <span className="ml-1 hidden sm:inline-block">
                          clicks
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <a
                href={originalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="line-clamp-1 w-full text-sm text-gray-500 underline-offset-2 transition-all hover:text-gray-800 hover:underline"
              >
                {originalLink}
              </a>
            </div>
          </div>
          {!isPublic ? (
            <>
              <Dropdown>
                <DropdownTrigger>
                  <button
                    type="button"
                    className="rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200"
                  >
                    <span className="sr-only">Edit</span>
                    <VerticalThreeDotsIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(key) => {
                    switch (key) {
                      case "edit":
                        setIsEdit(true);
                        break;

                      case "delete":
                        const toastId = toast.loading("Deleting short link");
                        deleteMutation(shortLink, {
                          onError: () =>
                            toast.error("Failed to delete short link"),
                          onSettled: () => toast.dismiss(toastId),
                        });

                        break;

                      default:
                        break;
                    }
                  }}
                >
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              <Tooltip content="Copy to clipboard" placement="top" offset={15}>
                <button
                  onClick={() =>
                    copyToClipboard(`${window.location.href}${shortLink}`)
                  }
                  className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                >
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="text-gray-700 transition-all group-hover:text-blue-800 size-5" />
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </>
  );
}
