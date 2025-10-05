import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const BestPractices = () => {
  const practices = [
    "Use unique passwords for every account",
    "Enable two-factor authentication (2FA) wherever available",
    "Use a password manager to store and generate passwords",
    "Make passwords at least 12-16 characters long",
    "Include a mix of uppercase, lowercase, numbers, and symbols",
    "Avoid common words, phrases, or patterns",
    "Never share your passwords via email or messaging",
    "Change passwords immediately if you suspect a breach",
    "Don't write passwords down in plain text",
    "Regularly audit and update old passwords",
    "Use biometric authentication when available",
    "Be cautious of phishing attempts",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Best Practices</h1>
              <p className="text-xl text-muted-foreground">
                Follow these guidelines to maintain strong password security
              </p>
            </div>

            <div className="space-y-4">
              {practices.map((practice, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-card border border-border/50 p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{practice}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-primary/10 border border-primary/20 p-8">
              <h2 className="text-2xl font-bold mb-4">Remember</h2>
              <p className="text-muted-foreground">
                Your password is often the only barrier between your personal information and
                cybercriminals. Taking the time to create strong, unique passwords and following
                these best practices can significantly reduce your risk of being compromised.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BestPractices;
