import { cn } from "@/lib/utils/shadcn";
import { HTMLAttributes } from "react";

interface WindowCardProps extends HTMLAttributes<HTMLDivElement> {
  draggable?: boolean;
}

export function WindowCard({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("border-2 shrink border-primary rounded-lg", className)}>
      <div className="border-b-2 border-primary flex p-2 md:p-4 gap-2">
        <div className="w-4 h-4  border-primary shrink-0 rounded-full border-2"></div>
        <div className="w-4 h-4  border-primary shrink-0 rounded-full border-2"></div>
        <div className="w-4 h-4  border-primary shrink-0 rounded-full border-2"></div>
      </div>
      {children}
    </div>
  );
}

export function WindowCardContent({ children, ...rest }: WindowCardProps) {
  return <div {...rest}>{children}</div>;
}
