import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { analyzePassword, StrengthResult } from "@/lib/strength";
import { checkPasswordBreach } from "@/lib/breach-check";
import { siteConfig } from "@/config/site.config";

export const PasswordAnalyzer = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<StrengthResult | null>(null);
  const [breachCheckEnabled, setBreachCheckEnabled] = useState(false);
  const [breachResult, setBreachResult] = useState<{
    breached: boolean;
    count: number;
    loading: boolean;
    error?: string;
  }>({
    breached: false, count: 0, loading: false, error: undefined
  });

  // Analyze password in real-time
  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [password]);

  useEffect(() => {
    if (breachCheckEnabled && password) {
      setBreachResult({ breached: false, count: 0, loading: true, error: undefined });
      checkPasswordBreach(password)
        .then(res => setBreachResult({ ...res, loading: false }))
        .catch(err => setBreachResult({ breached: false, count: 0, loading: false, error: err.message }));
    } else {
      setBreachResult({ breached: false, count: 0, loading: false, error: undefined });
    }
  }, [password, breachCheckEnabled]);


  return (
    <section id="analyzer" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">AI Password Analyzer</h2>
            <p className="text-muted-foreground text-lg">
              Check your password strength instantly
            </p>
          </div>

          <div className="rounded-2xl bg-card border border-border/50 p-8 md:p-12 shadow-glow">
            <div className="mb-6">
              <Label htmlFor="password" className="mb-3 block text-sm font-medium">
                Enter Password
              </Label>
              <div className="p-[1.5px] bg-gradient-to-r from-[hsl(258_90%_66%)] to-[hsl(243_75%_59%)] rounded-xl">
                <div className="relative bg-[hsl(217_33%_6%)] rounded-[10px]">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password here..."
                    className="pr-12 h-14 text-base bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Analyzed locally. Your password never leaves your device.
              </p>
            </div>

            {analysis && password && (
              <div className="space-y-6 animate-fade-in">
                {/* Requirements */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Requirements</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span>{password.length >= 8 ? '✅' : '❌'}</span> At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{/[A-Z]/.test(password) ? '✅' : '❌'}</span> Uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{/[a-z]/.test(password) ? '✅' : '❌'}</span> Lowercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{/\d/.test(password) ? '✅' : '❌'}</span> Number
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{/[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(password) ? '✅' : '❌'}</span> Special character
                    </li>
                  </ul>
                </div>

                {/* Analysis */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Analysis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="mb-1 text-xs text-muted-foreground">Entropy</div>
                      <div className="text-2xl font-bold">{analysis.entropyBits} bits</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="mb-1 text-xs text-muted-foreground">Length</div>
                      <div className="text-2xl font-bold">{password.length} chars</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {analysis.suggestions.length > 0 && (
                  <div className="flex gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Recommendations</p>
                      <ul className="space-y-1 text-sm text-muted-foreground mt-2">
                        {analysis.suggestions.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Breach Check */}
            {siteConfig.features.breachCheck && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="breach-check" className="text-sm font-medium cursor-pointer">
                      Check against known data breaches
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Privacy-safe using k-anonymity (only hash prefix sent)
                    </p>
                  </div>
                  <Switch
                    id="breach-check"
                    checked={breachCheckEnabled}
                    onCheckedChange={setBreachCheckEnabled}
                  />
                </div>

                {breachCheckEnabled && password && (
                  <div className="animate-fade-in">
                    {breachResult.loading ? (
                      <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground">Checking breaches...</p>
                      </div>
                    ) : breachResult.error ? (
                      <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Unable to check: {breachResult.error}
                        </p>
                      </div>
                    ) : breachResult.breached ? (
                      <div className="flex gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                        <div>
                          <p className="font-medium text-destructive">
                            This password has been exposed in data breaches!
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Seen {breachResult.count.toLocaleString()} times. Choose a different password.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-green-500">
                            No breaches found
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            This password hasn't appeared in known data breaches.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
