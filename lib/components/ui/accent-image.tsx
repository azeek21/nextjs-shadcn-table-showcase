import { cn } from "@/lib/utils/shadcn";
import Image, { ImageProps } from "next/image";

interface AccentImageProps extends ImageProps {
  accentClassName?: string;
  containerClassName?: string;
  animated?: boolean;
  hoverable?: boolean;
}

export function AccentImage({
  className,
  accentClassName,
  containerClassName,
  animated,
  hoverable,
  ...rest
}: AccentImageProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all",
        hoverable && "hover:scale-105",
        containerClassName,
      )}
    >
      <span
        className={cn(
          "absolute -z-0 w-[150%] h-[150%] -top-1/4 -left-1/4 bg-no-repeat bg-center blur-xl",
          animated && "animate-spin",
          accentClassName,
        )}
        style={{
          backgroundImage: `url(${rest.src})`,
          animationDuration: "15s",
        }}
      />
      <Image className={cn("z-10", className)} {...rest} />
    </div>
  );
}
