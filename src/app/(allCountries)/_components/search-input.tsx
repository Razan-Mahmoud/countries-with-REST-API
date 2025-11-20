"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/lib/components/ui/input";

export default function SearchInput() {
  // Navigation
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Search function
  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term.toLowerCase());
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="grid h-11 grid-cols-2">
      <div className="relative h-12 grid-cols-2">
        <Search size={20} strokeWidth={1.5} className="absolute start-2 top-4" color="gray" />
        <Input
          onChange={(e) => handleChange(e.target.value?.toLowerCase())}
          placeholder="Search for a country..."
          className="rounded-xl p-3 ps-10 shadow-sm shadow-zinc-100 dark:bg-slate-600 dark:shadow-none"
          defaultValue={searchParams.get("query")?.toString().toLowerCase()}
        />
      </div>
    </div>
  );
}
