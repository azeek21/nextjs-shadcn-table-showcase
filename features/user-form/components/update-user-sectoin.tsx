import { UserForm } from "./form";

export function UpdateUserSection() {
  return (
    <section
      id="cta-target"
      className="relative overflow-hidden flex min-h-[80svh] w-full flex-col justify-end items-center gap-9 pb-20"
    >
      <span className="absolute -z-10 w-[300%] left-[-100%] aspect-square bottom-[-130%] sm:bottom-[-200%] md:bottom-[-250%] lg:bottom-[-345%] xl:bottom-[-425%] bg-accent-blugray rounded-full" />
      <h1 className="text-4xl font-bold">Форма заявки</h1>
      <UserForm />
    </section>
  );
}
