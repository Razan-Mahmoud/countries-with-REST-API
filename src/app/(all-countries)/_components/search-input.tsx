"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/lib/components/ui/input";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputValue, setInputValue] = useState(searchParams.get("query")?.toLowerCase() || "");

  useEffect(() => {
    setInputValue(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term.toLowerCase());
      params.delete("data");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (val: string) => {
    setInputValue(val);
    handleSearch(val);
  };

  return (
    <div className="grid h-11 grid-cols-2">
      <div className="relative col-span-2 h-12">
        <Search size={20} strokeWidth={1.5} className="absolute start-2 top-4" color="gray" />
        <Input
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for a country..."
          className="rounded-xl bg-white p-3 ps-8 shadow-sm dark:bg-slate-600 md:ps-10"
        />
      </div>
    </div>
  );
}
