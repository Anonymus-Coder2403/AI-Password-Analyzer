import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { analyzePassword, PasswordAnalysis } from "@/lib/password-analyzer";
import { checkPasswordBreach } from "@/lib/breach-check";
import { siteConfig } from "@/config/site.config";

export const PasswordAnalyzer = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);
  const [breachCheckEnabled, setBreachCheckEnabled] = useState(false);
  const [breachResult, setBreachResult] = useState<{
    breached: boolean;
    count: number;
    loading: boolean;
    error?: string;
  }>({ breached: false, count: 0, loading: false });

  // Analyze password in real-time
  useEffect(() => {
    const result = analyzePassword(password);
    setAnalysis(result);
  }, [password]);

  // Handle breach check
  const handleBreachCheck = async () => {
    if (!password || !breachCheckEnabled) return;

    setBreachResult({ breached: false, count: 0, loading: true });

    const result = await checkPasswordBreach(password);
    setBreachResult({ ...result, loading: false });
  };

  useEffect(() => {
    if (breachCheckEnabled && password) {
      handleBreachCheck();
    } else {
      setBreachResult({ breached: false, count: 0, loading: false });
    }
  }, [password, breachCheckEnabled]);

  const strengthColors = {
    'very-weak': 'bg-destructive',
    'weak': 'bg-orange-500',
    'fair': 'bg-yellow-500',
    'good': 'bg-blue-500',
    'strong': 'bg-green-500',
  };

  const strengthLabels = {
    'very-weak': 'Very Weak',
    'weak': 'Weak',
    'fair': 'Fair',
    'good': 'Good',
    'strong': 'Strong',
  };

  return (
    <section id="analyzer" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Password Strength Analyzer
            </h2>
            <p className="text-muted-foreground">
              Test your password security with real-time analysis
            </p>
          </div>

          {/* Main Analyzer Card */}
          <div className="rounded-2xl bg-card border border-border/50 p-6 md:p-8 shadow-lg hover:shadow-glow-sm transition-shadow duration-300">
            {/* Password Input */}
            <div className="mb-6">
              <Label htmlFor="password" className="mb-2 block text-sm font-medium">
                Enter Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password here..."
                  className="pr-10 h-12 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Analyzed locally. Your password never leaves your device.
              </p>
            </div>

            {/* Strength Meter */}
            {analysis && password && (
              <div className="space-y-6 animate-fade-in">
                {/* Strength Bars */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Strength</span>
                    <span className={`text-sm font-semibold ${analysis.score >= 4 ? 'text-green-500' : analysis.score >= 3 ? 'text-yellow-500' : 'text-destructive'}`}>
                      {strengthLabels[analysis.strength]}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                          level <= analysis.score
                            ? strengthColors[analysis.strength]
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Entropy & Crack Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-1 text-xs text-muted-foreground">Entropy</div>
                    <div className="text-2xl font-bold">{analysis.entropy} bits</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-1 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Time to Crack (Offline)
                    </div>
                    <div className="text-2xl font-bold">{analysis.crackTimes.offlineSlowHash}</div>
                  </div>
                </div>

                {/* Detailed Crack Times */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    View detailed crack time estimates
                  </summary>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Online (throttled, 10/sec):</span>
                      <span className="font-medium">{analysis.crackTimes.onlineThrottled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Online (unthrottled, 100/sec):</span>
                      <span className="font-medium">{analysis.crackTimes.onlineUnthrottled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offline (slow hash, bcrypt):</span>
                      <span className="font-medium">{analysis.crackTimes.offlineSlowHash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offline (fast hash, MD5):</span>
                      <span className="font-medium">{analysis.crackTimes.offlineFastHash}</span>
                    </div>
                  </div>
                </details>

                {/* Feedback */}
                {analysis.feedback.warning && (
                  <div className="flex gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-medium text-destructive">{analysis.feedback.warning}</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {analysis.feedback.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span>•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {!analysis.feedback.warning && analysis.score >= 4 && (
                  <div className="flex gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-500">Strong password!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {analysis.feedback.suggestions[0]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Breach Check Toggle */}
            {siteConfig.features.breachCheck && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="breach-check" className="text-sm font-medium cursor-pointer">
                      Check if password appears in known breaches
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
