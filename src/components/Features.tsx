import { Zap, Lightbulb, Lock, Timer, Brain, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Instant feedback as you type with no delays or waiting.",
  },
  {
    icon: Lightbulb,
    title: "Security Tips",
    description: "Actionable suggestions to improve your password strength.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Local analysis means your password never leaves your browser.",
  },
  {
    icon: Timer,
    title: "Crack Time Estimation",
    description: "Realistic estimates based on current attacker models.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Pattern recognition identifies weak spots and common mistakes.",
  },
  {
    icon: Shield,
    title: "Breach Detection",
    description: "Optional privacy-safe k-anonymity check against known breaches.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-panel/30">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need for Password Security
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive analysis tools to keep your accounts secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl bg-card border border-border/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:shadow-glow-sm transition-shadow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
