"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { Command, CommandGroup, CommandItem, CommandList } from "@/lib/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover";

const regions = [
  {
    value: "africa",
    label: "Africa",
  },
  {
    value: "america",
    label: "America",
  },
  {
    value: "asia",
    label: "Asia",
  },
  {
    value: "europe",
    label: "Europe",
  },
  {
    value: "oceania",
    label: "Oceania",
  },
];

export default function FilterByRegion() {
  // State
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // Navigation
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Select function
  function handleSelect(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("data", term);
    } else {
      params.delete("data");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="flex h-11 w-[200px] justify-between rounded-sm bg-white p-3 shadow-sm shadow-zinc-100 focus:border-none dark:bg-slate-600 dark:shadow-none"
      >
        {value ? regions.find((region) => region.value === value)?.label : "Filter by Region"}
        <ChevronDown className="opacity-50" size={20} strokeWidth={1.75} />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-white p-0 dark:bg-slate-600">
        <Command>
          <CommandList>
            <CommandGroup className="w-[200px] rounded-sm p-3 shadow-zinc-100 dark:bg-slate-600">
              {regions.map((region) => (
                <CommandItem
                  key={region.value}
                  value={region.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    handleSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  {region.label}
                  <Check
                    className={cn("ml-auto", value === region.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
