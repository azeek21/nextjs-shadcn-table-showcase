import { buttonVariants } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import Link from "next/link";

export function CTATakeATest({ className }: { className: string }) {
  return (
    <Link
      href="#cta-target"
      className={buttonVariants({ className: cn(className, "font-medium") })}
    >
      Sinovdan o'ting
    </Link>
  );
}
