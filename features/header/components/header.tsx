"use client";

import { DarkModeToggle } from "@/lib/components/theme/dark-mode-toggle";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CTATakeATest } from "./call-to-action";
import { LanguageToggle } from "@/lib/components/language/language-toggle";
import { NAV_PAGES } from "../const";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="p-5 flex items-center border-b border-muted md:sticky md:top-0 md:backdrop-blur-2xl z-40">
      <div
        className={cn(
          "z-40 flex flex-col justify-between p-4 md:p-0 fixed transition-all top-0 left-0 right-0 bottom-0 translate-x-full backdrop-blur-xl md:backdrop-blur-none md:translate-x-0 md:relative md:flex-row w-full max-w-screen-max md:mx-auto md:items-center",
          isOpen && "translate-x-0",
        )}
      >
        <nav className="my-auto md:m-0">
          <ul className="text-center text-lg font-semibold flex flex-col gap-4 md:flex-row md:gap-8 md:text-left">
            {NAV_PAGES.map((page) => (
              <li
                onClick={() => setIsOpen(false)}
                key={`${page.link}-${page.label}`}
              >
                <Link href={page.link}>{page.label}</Link>
              </li>
            ))}
            <li className="md:hidden">
              <CTATakeATest onClick={() => setIsOpen(false)} />
            </li>
          </ul>
        </nav>

        {/* actions */}
        <div className={"mt-auto md:ml-auto md:mt-0 flex gap-2"}>
          <DarkModeToggle />
          <LanguageToggle />
          <CTATakeATest className="hidden md:block" />
        </div>
      </div>

      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="sm"
        className="md:hidden ml-auto z-50"
      >
        {isOpen ? <XIcon /> : <MenuIcon />}
      </Button>
    </header>
  );
}
