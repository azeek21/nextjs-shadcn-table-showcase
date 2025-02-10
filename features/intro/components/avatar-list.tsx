import { Avatar, AvatarFallback } from "@/lib/components/ui/avatar";
import { checkIsNonEmptyArrayLike } from "@/lib/utils/checks";
import { cn } from "@/lib/utils/shadcn";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface AvatarListProps extends HTMLAttributes<HTMLDivElement> {
  srcs: string[];
}
export function AvatarList({ srcs, className, ...rest }: AvatarListProps) {
  return (
    <div className={cn("flex")} {...rest}>
      {checkIsNonEmptyArrayLike(srcs) &&
        srcs.map((src, i) => (
          <Avatar
            key={src}
            style={{
              transform: `translateX(-${0.7 * i}rem)`,
              zIndex: i,
            }}
            className="w-12 h-12"
          >
            <Image src={src} alt="User Avatar" width={50} height={50} />
          </Avatar>
        ))}
      <Avatar
        style={{
          transform: `translateX(-${srcs.length * 0.7}rem)`,
          zIndex: srcs.length,
        }}
        className="w-12 h-12"
      >
        <AvatarFallback className="bg-accent-purple text-primary-foreground p-2 font-semibold dark:text-primary">
          +120
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
