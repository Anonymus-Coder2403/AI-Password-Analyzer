import { Shield, Menu } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { siteConfig } from "@/config/site.config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Desktop Navigation */}
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {siteConfig.nav.auth.map((item) => (
            <GradientButton
              key={item.href}
              variant={item.variant === "default" ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <a href={item.href}>{item.label}</a>
            </GradientButton>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full">
            <nav className="flex flex-col gap-4 mt-8">
              {siteConfig.nav.main.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-2 py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                {siteConfig.nav.auth.map((item) => (
                  <GradientButton
                    key={item.href}
                    variant={item.variant === "default" ? "default" : "ghost"}
                    asChild
                  >
                    <a href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
                  </GradientButton>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
