import { KeyRound, BarChart3, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: KeyRound,
    title: "Enter your password",
    description: "Type any password into our secure analyzer field to begin the evaluation process.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get instant analysis",
    description: "Our advanced algorithms instantly evaluate strength, entropy, and potential vulnerabilities.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Improve & secure",
    description: "Follow personalized recommendations to create an unbreakable password.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to stronger password security
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Step number badge */}
                  <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 relative z-10">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                        {step.number}
                      </div>
                      <Icon className="h-6 w-6 text-primary mx-auto mt-1" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
