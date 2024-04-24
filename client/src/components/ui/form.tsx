import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@nextui-org/react";
import {
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

export function Form<T extends z.ZodTypeAny>({
  schema,
  id,
  children,
  className,
  onSubmit,
  options,
}: {
  schema: T;
  id?: string;
  className?: string;
  options?: UseFormProps<z.infer<typeof schema>>;
  children: (methods: UseFormReturn<z.infer<typeof schema>>) => React.ReactNode;
  onSubmit: SubmitHandler<z.infer<typeof schema>>;
}) {
  const methods = useForm<z.infer<typeof schema>>({
    ...options,
    resolver: zodResolver(schema),
  });

  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
}
