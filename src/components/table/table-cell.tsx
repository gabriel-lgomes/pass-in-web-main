import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

interface TableCellProps extends ComponentProps<"td"> {}

export function TableCell(props: TableCellProps) {
  return (
    <td
      {...props}
      className={twMerge("py-3 px-4 text-sm text-zinc-300", props.className)}
    />
  );
}
