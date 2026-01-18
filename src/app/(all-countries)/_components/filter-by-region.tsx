"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/lib/components/ui/command";

const regions = [
  { value: "all", label: "All Continents" },
  { value: "africa", label: "Africa" },
  { value: "america", label: "America" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

export default function FilterByRegion() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedValue = searchParams.get("data") || "all";

  const [open, setOpen] = useState(false);

  function handleSelect(term: string) {
    const params = new URLSearchParams(searchParams);
    params.delete("query");

    if (term && term !== "all") {
      params.set("data", term);
    } else {
      params.delete("data");
    }
    replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div className="grid grid-cols-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          role="combobox"
          className="col-span-2 flex h-11 items-center justify-between rounded-xl bg-white p-2 shadow-sm dark:bg-slate-600 md:w-[200px] md:p-3"
        >
          {regions.find((r) => r.value === selectedValue)?.label || "Filter by Region"}
          <ChevronDown className="opacity-50" size={20} strokeWidth={1.75} />
        </PopoverTrigger>

        <PopoverContent className="col-span-2 bg-white p-0 dark:bg-slate-600 md:w-[200px]">
          <Command>
            <CommandList>
              <CommandGroup className="w-[200px] p-3">
                {regions.map((region) => (
                  <CommandItem
                    key={region.value}
                    value={region.value}
                    onSelect={() => handleSelect(region.value)}
                  >
                    {region.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedValue === region.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
