import { Shield, Lock, FileText } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Local-Only Analysis",
    description: "Your passwords never leave your browser",
  },
  {
    icon: Lock,
    title: "Optional Breach Check",
    description: "Privacy-safe k-anonymity checking",
  },
  {
    icon: FileText,
    title: "Open Documentation",
    description: "Transparent methodology and code",
  },
];

export const SecurityBadges = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 border border-border/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
