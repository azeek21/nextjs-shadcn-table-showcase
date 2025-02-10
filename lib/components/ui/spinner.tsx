import { cn } from "@/lib/utils/shadcn";
import { HTMLAttributes } from "react";

export function Spinner({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-block w-4 h-4 aspect-square border-2 border-b-0 border-l-0 rounded-full border-dotted animate-spin",
        className,
      )}
      {...rest}
    ></span>
  );
}
