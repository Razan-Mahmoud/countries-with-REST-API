import { ThemeProvider } from "./components/theme-provider";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
