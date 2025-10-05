import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 panel-glass">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.shortName}
          </span>
        </a>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.nav.main.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-2 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {siteConfig.nav.auth.map((item) => (
            <Button
              key={item.href}
              variant={item.variant}
              size="sm"
              asChild
              className={
                item.variant === "default"
                  ? "gradient-primary hover:shadow-glow-sm transition-all duration-200"
                  : ""
              }
            >
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};
