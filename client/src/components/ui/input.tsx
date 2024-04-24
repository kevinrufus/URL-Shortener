import {
  extendVariants,
  Input as NextInput,
  InputProps,
  VariantProps,
} from "@nextui-org/react";
import { forwardRef } from "react";

const CustomInputVariants = extendVariants(NextInput, {
  variants: {
    variant: {
      bordered: {
        label: " text-black font-medium",
        inputWrapper: "px-0",
        input: "rounded-md px-3",
      },
    },
  },
  defaultVariants: {
    variant: "bordered",
    labelPlacement: "outside",
  },
});

type InputVariantProps = VariantProps<typeof CustomInputVariants>;

type MergedProps = InputVariantProps &
  Omit<InputProps, keyof InputVariantProps>;

const Input = forwardRef<HTMLInputElement, MergedProps>(function Input(
  { ...otherProps },
  ref
) {
  return <CustomInputVariants ref={ref} {...otherProps} />;
});

export default Input;
