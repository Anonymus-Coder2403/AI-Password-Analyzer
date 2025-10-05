import { GradientButton } from "@/components/ui/gradient-button";
import { Shield, BookOpen } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="relative mx-auto max-w-4xl">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 blur-3xl opacity-50" />
          
          {/* Main card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border border-border/50 p-8 md:p-12 text-center shadow-glow">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to Test Your Password Security?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join millions of users who trust SecurePass Checker for their password
              security analysis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton
                size="lg"
                asChild
              >
                <a href="#analyzer">
                  <Shield className="h-5 w-5" />
                  Start Free Analysis
                </a>
              </GradientButton>
              <GradientButton
                size="lg"
                variant="outline"
                asChild
              >
                <a href="/security-guide">
                  <BookOpen className="h-5 w-5" />
                  Learn More About Security
                </a>
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
