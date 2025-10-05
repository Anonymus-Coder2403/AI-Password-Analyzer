import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Check } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Spotlight gradient background */}
      <div className="absolute inset-0 gradient-spotlight pointer-events-none" />
      
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
              AI Password Analyzer
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Our ai powered analyzer works on all devices, so you only have to set it up once,
            and get privacy-first password insights that never leave your browser.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              asChild
              className="gradient-primary hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5"
            >
              <a href="#analyzer" className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Get Started
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border/50 hover:border-border transition-all duration-200 hover:-translate-y-0.5"
            >
              <a href="/docs" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Read the docs
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>100% Client-Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
