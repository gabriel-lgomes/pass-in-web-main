import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      className={twMerge(
        "flex w-full justify-center mt-3 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-25",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
