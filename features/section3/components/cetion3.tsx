import { AccentImage } from "@/lib/components/ui/accent-image";
import { WindowCard, WindowCardContent } from "@/lib/components/ui/window-card";

export function Section3() {
  return (
    <section className="relative flex text-center md:text-left min-h-[80svh] w-full gap-8 md:gap-20 flex-col md:flex-row-reverse items-center">
      <div className="flex flex-col gap-4 flex-[0.8]">
        <h2 className="text-4xl font-bold">
          Aksariyat kompaniyalar ishga joylashishda sizdan ish staji va
          portfolio so'raydi
        </h2>
        <p className="text-xl text-muted-foreground">
          Tabiyki endigini bu sohaga kirib kelayotgan internlarda bular mavjud
          emas. Ma'lum bir ish stajiga ega bo'lish va turli xil qiziqarli
          lohiyalardan iborat portfolioni hosil qilish uchun ushbu loyihada
          amaliyot o'tashni taklif qilamiz.
        </p>
        <p className="text-xl text-muted-foreground">
          Amaliyotchilar soni chegaralangan va konkurs asosida saralab olinadi.
          Eng yuqori ball to'plagan 10 kishi bepul amaliyot o'tash imkoniyatiga
          ega bo'ladi.
        </p>
      </div>
      <WindowCard className="relative w-72 sm:w-80 mx-auto md:m-0 min-h-[400px] md:w-[430px]  sm:h-[450px] md:h-[550px]">
        <WindowCardContent>
          <AccentImage
            hoverable
            src={"/assets/img/section3-grandma.png"}
            alt="Charm woman working from home on laptop"
            containerClassName="w-full rounded-lg absolute -left-4 top-12 sm:top-20 sm:-left-8"
            accentClassName="animate-none hidden md:block"
            className="w-full"
            width={300}
            height={300}
          />

          <AccentImage
            hoverable
            containerClassName="w-1/3 object-cover rounded-lg absolute right-0 -bottom-8 z-10"
            accentClassName="animate-none hidden md:block"
            src={"/assets/img/handshake.png"}
            alt="Two men shaking each other's"
            width={300}
            height={300}
          />
        </WindowCardContent>
      </WindowCard>
    </section>
  );
}
