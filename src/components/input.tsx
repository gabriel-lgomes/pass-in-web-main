import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {}

export function Input({ ...props }: InputProps) {
  return (
    <label>
      <label className="block text-sm font-medium leading-6 text-white my-2">
        {props.name}:
        <input
          {...props}
          className={twMerge(
            "block w-full mt-1 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6",
            props.className
          )}
        />
      </label>
    </label>
  );
}
