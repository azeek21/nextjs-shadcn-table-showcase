import { Button, buttonVariants } from "@/lib/components/ui/button";
import { AvatarList } from "./avatar-list";
import { AccentImage } from "@/lib/components/ui/accent-image";
import Link from "next/link";

const FLOATING_ICONS_SIZING =
  "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:w-20 xl:w-24 xl:h-24";

export function IntroSection() {
  return (
    <section className="relative flex text-center max-h-[80svh] h-svh">
      <div className="m-auto flex flex-col gap-8">
        <h1 className="text-4xl/relaxed md:text-5xl/loose font-bold mb-9">
          Ваша работа мечты уже ждет вас,
          <br />
          начните сегодня!
        </h1>
        <div className="flex items-center gap-4 flex-col md:flex-row mx-auto md:gap-0">
          <AvatarList
            srcs={[
              "/assets/img/person-1-pfp.png",
              "/assets/img/person-2-pfp.png",
              "/assets/img/person-3-pfp.png",
            ]}
          />
          <p className="max-w-screen-min md:text-left">
            человек уже стали участниками групп по своим направлениям
          </p>
        </div>
        <Link
          href="#cta-target"
          className={buttonVariants({
            variant: "purple",
            size: "lg",
            className: "mx-auto",
          })}
        >
          Оставит заявку
        </Link>
        {/* Keep images behind in case they overlap */}
        <div className="absolute w-full h-full top-0 left-0 -z-10">
          <AccentImage
            animated
            hoverable
            src={"/assets/img/html-logo.svg"}
            alt="Html logo"
            className={FLOATING_ICONS_SIZING}
            containerClassName="absolute top-2 -translate-x-1/2 md:top-[15%] left-1/2"
            width={250}
            height={250}
          />
          <AccentImage
            animated
            hoverable
            src={"/assets/img/figma-logo.svg"}
            alt="Figma logo"
            className={FLOATING_ICONS_SIZING}
            containerClassName="absolute top-[10%] left-4 md:top-1/4 md:-translate-y-full"
            width={250}
            height={250}
          />
          <AccentImage
            animated
            hoverable
            src={"/assets/img/flutter-logo.svg"}
            alt="Flutter logo"
            className={FLOATING_ICONS_SIZING}
            containerClassName="absolute top-44 right-4 md:top-1/2 md:-translate-y-full"
            width={250}
            height={250}
          />
          <AccentImage
            animated
            hoverable
            src={"/assets/img/dart-logo.svg"}
            alt="Dart logo"
            className={FLOATING_ICONS_SIZING}
            containerClassName="absolute top-1/2 right-8 md:right-1/4 md:top-3/4 md:-translate-y-full"
            width={250}
            height={250}
          />
          <AccentImage
            animated
            hoverable
            src={"/assets/img/python-logo.svg"}
            alt="Python logo"
            className={FLOATING_ICONS_SIZING}
            containerClassName="absolute bottom-4 left-8 md:left-1/4 md:bottom-16 md:-translate-y-full"
            width={250}
            height={250}
          />
        </div>
      </div>
    </section>
  );
}
