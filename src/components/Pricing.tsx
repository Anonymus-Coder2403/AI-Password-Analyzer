import { Check } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal use",
    features: [
      "Unlimited password analysis",
      "Real-time strength feedback",
      "Breach detection",
      "Privacy-first (local only)",
      "Crack time estimates",
    ],
    cta: "Get Started",
    ctaHref: "/#analyzer",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For security professionals",
    features: [
      "Everything in Free",
      "Password generator",
      "Save audit history",
      "Export reports",
      "Priority support",
      "Advanced analytics",
    ],
    cta: "Start Free Trial",
    ctaHref: "/signup",
    popular: true,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl bg-card border p-8 transition-all duration-200 hover:-translate-y-1 animate-fade-in ${
                plan.popular
                  ? "border-primary/50 shadow-glow-sm"
                  : "border-border/50 hover:shadow-glow-sm"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <GradientButton
                asChild
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                className="w-full"
              >
                <a href={plan.ctaHref}>{plan.cta}</a>
              </GradientButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
