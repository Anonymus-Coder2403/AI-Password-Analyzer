import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookOpen, Code, Globe } from "lucide-react";

const Docs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Documentation</h1>
              <p className="text-xl text-muted-foreground">
                Learn how to integrate SecurePass Checker into your applications
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-sm text-muted-foreground">
                  Quick start guide and basic usage
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <Code className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2" id="api">API Reference</h3>
                <p className="text-sm text-muted-foreground">
                  Complete API documentation
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <Globe className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2" id="changelog">Changelog</h3>
                <p className="text-sm text-muted-foreground">
                  Latest updates and changes
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground">
                  SecurePass Checker provides a powerful, privacy-first password strength analyzer
                  that can be embedded in any web application. All password analysis happens
                  client-side, ensuring user passwords never leave their browser.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time password strength analysis</li>
                  <li>• Entropy calculation and crack time estimation</li>
                  <li>• Pattern detection (sequences, repeats, keyboard patterns)</li>
                  <li>• Common password detection</li>
                  <li>• Optional breach detection via k-anonymity</li>
                  <li>• Zero external dependencies</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Usage Example</h2>
                <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`import { analyzePassword } from '@securepass/analyzer';

const analysis = analyzePassword('MyP@ssw0rd123');
console.log(analysis.strength); // 'good'
console.log(analysis.entropy); // 65.4 bits
console.log(analysis.crackTimes.offlineSlowHash); // '3 years'`}</pre>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
