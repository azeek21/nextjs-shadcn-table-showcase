import { RatingsTable } from "./ratings-table";

export function RatingsSection() {
  return (
    <section className="relative flex flex-col max-h-[80svh] h-svh gap-4 md:gap-9">
      <h1 className="text-4xl font-bold">Рейтинг участников</h1>
      <RatingsTable />
    </section>
  );
}
