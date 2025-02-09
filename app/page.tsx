import { DarkModeToggle } from "@/lib/components/theme/dark-mode-toggle";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-primary">Hello World</h1>
      <DarkModeToggle />
    </div>
  );
}
