"use client";

import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";

export default function ThemeToggle() {
  // hooks
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between gap-2 border-none ps-4 outline-none">
        {/* Light icon */}
        <Moon className="size-6 rotate-0 scale-100 !transition-all dark:-rotate-0 dark:scale-0" />

        {/* Dark icon */}
        <Moon className="absolute size-6 rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100" />
        <span className="text-xl font-semibold lg:text-base">Dark Mode</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[130px] rounded-md bg-zinc-100 p-3 shadow-zinc-100 dark:bg-slate-600 dark:shadow-none">
        <DropdownMenuItem
          className="cursor-pointer border-none outline-none"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer border-none outline-none"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer border-none outline-none"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
