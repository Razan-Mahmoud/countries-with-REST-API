"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/lib/components/ui/button";

export function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-24 p-3" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant={"outline"}
      className="theme-toggle-btn rounded-lg border-[1.5px] border-neutral-400 bg-transparent px-1 text-lg font-medium hover:bg-transparent dark:border-gray-300 dark:text-slate-200 dark:hover:text-slate-200 md:p-2"
    >
      {resolvedTheme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
