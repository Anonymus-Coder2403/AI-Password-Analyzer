import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Key, AlertCircle } from "lucide-react";

const Generator = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <Key className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Password Generator</h1>
              <p className="text-xl text-muted-foreground">
                Generate strong, random passwords instantly
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/50 p-8 text-center">
              <div className="inline-flex items-center gap-3 rounded-lg bg-primary/10 border border-primary/20 px-6 py-4 mb-6">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">Coming Soon</span>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our password generator tool is currently under development. In the meantime,
                we recommend using the{" "}
                <a href="/#analyzer" className="text-primary hover:underline">
                  password analyzer
                </a>
                {" "}to check the strength of your existing passwords, or using a trusted password
                manager like 1Password or Bitwarden to generate secure passwords.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Generator;
