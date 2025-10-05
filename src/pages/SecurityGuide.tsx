import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Key, AlertTriangle } from "lucide-react";

const SecurityGuide = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Security Guide</h1>
              <p className="text-xl text-muted-foreground">
                Essential tips for creating and managing secure passwords
              </p>
            </div>

            {/* Key Principles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Length Matters</h3>
                <p className="text-sm text-muted-foreground">
                  Use passwords with at least 12-16 characters for strong security
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <Lock className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Mix Character Types</h3>
                <p className="text-sm text-muted-foreground">
                  Combine uppercase, lowercase, numbers, and special symbols
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <Key className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Unique for Each Site</h3>
                <p className="text-sm text-muted-foreground">
                  Never reuse passwords across different accounts
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <AlertTriangle className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Avoid Common Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  Don't use dictionary words, personal info, or predictable patterns
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Creating Strong Passwords</h2>
                <p className="text-muted-foreground mb-4">
                  A strong password should be random, long, and unique. Here are effective strategies:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use a password manager to generate and store complex passwords</li>
                  <li>• Create passphrases using random words (e.g., "correct-horse-battery-staple")</li>
                  <li>• Avoid substitutions like "@" for "a" - they're easy to crack</li>
                  <li>• Never use personal information (birthdays, names, addresses)</li>
                  <li>• Enable two-factor authentication whenever possible</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Password Managers</h2>
                <p className="text-muted-foreground">
                  Password managers are the most secure way to handle multiple complex passwords.
                  They encrypt your passwords with a master password and can generate strong,
                  unique passwords for every site you use. Popular options include 1Password,
                  Bitwarden, and LastPass.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Multi-Factor Authentication</h2>
                <p className="text-muted-foreground">
                  Even the strongest password can be compromised. Multi-factor authentication (MFA)
                  adds an extra layer of security by requiring a second form of verification, such as
                  a code from your phone or a biometric scan. Always enable MFA on important accounts.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityGuide;
