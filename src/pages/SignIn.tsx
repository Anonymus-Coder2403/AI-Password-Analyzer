import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

const SignIn = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to your SecurePass account
              </p>
            </div>

            <form className="rounded-2xl bg-card border border-border/50 p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-primary hover:shadow-glow transition-all duration-200"
                >
                  Sign In
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-primary hover:underline">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
