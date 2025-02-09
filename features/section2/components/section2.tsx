import { AccentImage } from "@/lib/components/ui/accent-image";
import { WindowCard, WindowCardContent } from "@/lib/components/ui/window-card";

export function Section2() {
  return (
    <section className="relative flex text-center md:text-left min-h-[80svh] w-full gap-8 flex-col md:flex-row items-center">
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="text-4xl font-bold md:w-3/4">
          Сайт рыбатекст поможет дизайнеру, верстальщику
        </h2>
        <p className="text-xl text-muted-foreground md:w-3/4">
          Siz IT o'quv kursini tugatdingiz yoki Internet tarmog'i orqali
          mustaqil o'rgandingiz, ammo ishga joylashishda qiyinchiliklarga
          uchrayapsizmi? Biz sizga yordam beramiz. Ushbu loyiha qobiliyatli
          yoshlarni topib, yetuk kadrlar bo'lib yetishishiga yordam berish uchun
          tashkil qilindi.
        </p>
      </div>
      <WindowCard className="relative w-72 sm:w-80 mx-auto md:m-0 min-h-[400px] md:w-[430px]  sm:h-[450px] md:h-[550px]">
        <WindowCardContent>
          <AccentImage
            hoverable
            src={"/assets/img/section2-man.png"}
            alt="A man working on his laptop in office"
            containerClassName="w-2/3 object-cover verflow-hidden rounded-lg absolute md:top-12 -left-4 top-9"
            accentClassName="hidden md:block"
            width={300}
            height={300}
          />

          <AccentImage
            hoverable
            containerClassName="w-1/3 object-cover verflow-hidden rounded-lg absolute right-0 top-1/2 -translate-y-1/3 z-10"
            src={"/assets/img/section2-book.png"}
            accentClassName="bg-opacity-50 md:bg-opacity-100"
            alt="A open book logo"
            width={300}
            height={300}
          />

          <AccentImage
            hoverable
            containerClassName="w-3/4 object-cover verflow-hidden rounded-lg absolute left-4 -bottom-8"
            accentClassName="hidden md:block"
            src={"/assets/img/section2-girl.png"}
            alt="Girl in offise working on laptop"
            width={300}
            height={300}
          />
        </WindowCardContent>
      </WindowCard>
    </section>
  );
}
