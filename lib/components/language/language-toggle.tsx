import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import Image from "next/image";
import { useState } from "react";

export function LanguageToggle() {
  const [lang, setLang] = useState("uz");
  return (
    <Select value={lang} onValueChange={(v) => setLang(v)}>
      <SelectTrigger className="border-none">
        <SelectValue defaultValue="uz" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="uz" className="flex">
          <div className="flex gap-2">
            <Image
              className="w-4 h-4 overflow-hidden object-cover"
              src={"/assets/img/flag-uz.svg"}
              width={50}
              height={50}
              alt="O'zbekiston bayrog'i"
            />{" "}
            <span>O{"'"}zbek tili</span>
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex gap-2">
            <Image
              className="w-4 h-4 overflow-hidden object-cover"
              src={"/assets/img/flag-us.svg"}
              width={50}
              height={50}
              alt="Flag of USA"
            />{" "}
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="ru">
          <div className="flex gap-2">
            <Image
              className="w-4 h-4 overflow-hidden object-cover"
              src={"/assets/img/flag-ru.svg"}
              width={50}
              height={50}
              alt="Флаг россии"
            />{" "}
            <span>Русский</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
