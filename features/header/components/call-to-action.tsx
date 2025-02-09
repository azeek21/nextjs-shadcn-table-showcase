import { buttonVariants } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import Link from "next/link";

export function CTATakeATest({
  className,
  onClick,
}: {
  className?: string;
  onClick?: VoidFunction;
}) {
  return (
    <Link
      href="#cta-target"
      className={buttonVariants({ className: cn(className, "font-medium") })}
      onClick={onClick}
    >
      Sinovdan o'ting
    </Link>
  );
}
