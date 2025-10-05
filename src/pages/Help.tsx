import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Help Center</h1>
              <p className="text-xl text-muted-foreground">
                Get answers to common questions about SecurePass Checker
              </p>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="rounded-2xl bg-card border border-border/50 p-6 text-center">
                <HelpCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FAQ</h3>
                <p className="text-sm text-muted-foreground">
                  Browse common questions
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help via email
                </p>
              </div>
              <div className="rounded-2xl bg-card border border-border/50 p-6 text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with our team
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <h3 className="text-xl font-semibold mb-3">Is my password stored or sent anywhere?</h3>
                <p className="text-muted-foreground">
                  No, never. All password analysis happens locally in your browser. Your password
                  never leaves your device, ensuring complete privacy.
                </p>
              </div>

              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <h3 className="text-xl font-semibold mb-3">How does the breach check work?</h3>
                <p className="text-muted-foreground">
                  We use k-anonymity to check passwords against known breaches. Only the first 5
                  characters of your password's hash are sent, making it impossible to reverse-engineer
                  your actual password.
                </p>
              </div>

              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <h3 className="text-xl font-semibold mb-3">How accurate are the crack time estimates?</h3>
                <p className="text-muted-foreground">
                  Our estimates are based on current attack speeds for various scenarios. However,
                  actual crack times can vary based on attacker resources and techniques.
                </p>
              </div>

              <div className="rounded-2xl bg-card border border-border/50 p-6">
                <h3 className="text-xl font-semibold mb-3">Can I use this for my business?</h3>
                <p className="text-muted-foreground">
                  Yes! The web tool is free for anyone to use. For API access and enterprise features,
                  please contact our sales team.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <Button asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
