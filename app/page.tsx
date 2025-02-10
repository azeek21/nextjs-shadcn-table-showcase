import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
import { IntroSection } from "@/features/intro";
import { RatingsSection } from "@/features/ratings";
import { Section2 } from "@/features/section2";
import { Section3 } from "@/features/section3";
import { UpdateUserSection } from "@/features/user-form";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-screen-max mx-auto px-2 md:px-4 space-y-32">
        <IntroSection />
        <Section2 />
        <Section3 />
        <UpdateUserSection />
        <RatingsSection />
      </main>
      <Footer />
    </>
  );
}
