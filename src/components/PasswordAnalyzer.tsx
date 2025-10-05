import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { analyzePassword, humanizeCrackTimes, StrengthResult } from "@/lib/strength";
import { checkPasswordBreach } from "@/lib/breach-check";
import { siteConfig } from "@/config/site.config";
import { StrengthBar } from "@/components/ui/strength-bar";
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
    breached: false,
    count: 0,
    loading: false
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

  // Handle breach check
  const handleBreachCheck = async () => {
    if (!password || !breachCheckEnabled) return;
    setBreachResult({
      breached: false,
      count: 0,
      loading: true
    });
    const result = await checkPasswordBreach(password);
    setBreachResult({
      ...result,
      loading: false
    });
  };
  useEffect(() => {
    if (breachCheckEnabled && password) {
      handleBreachCheck();
    } else {
      setBreachResult({
        breached: false,
        count: 0,
        loading: false
      });
    }
  }, [password, breachCheckEnabled]);
  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-destructive';
    if (score === 1) return 'bg-orange-500';
    if (score === 2) return 'bg-yellow-500';
    if (score === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };
  return <section id="analyzer" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[720px]">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Password Strength Analyzer
            </h2>
            <p className="text-muted-foreground text-lg">
              Test your password security with real-time analysis
            </p>
          </div>

          {/* Main Analyzer Card */}
          <div className="rounded-2xl bg-card border border-border/50 p-8 md:p-12 shadow-glow transition-all duration-300">
            {/* Password Input with Gradient Ring */}
            <div className="mb-6">
              <Label htmlFor="password" className="mb-3 block text-sm font-medium">
                Enter Password
              </Label>
              {/* Gradient ring wrapper */}
              <div className="p-[1.5px] bg-gradient-to-r from-[hsl(258_90%_66%)] to-[hsl(243_75%_59%)] rounded-xl">
                <div className="relative bg-[hsl(217_33%_6%)] rounded-[10px]">
                  <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Type your password here..." className="pr-12 h-14 text-base bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Analyzed locally. Your password never leaves your device.
              </p>
            </div>

            {/* Strength Meter */}
            {analysis && password && <div className="space-y-6 animate-fade-in">
                {/* 5-Segment Strength Bar */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Password Strength</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${analysis.score === 0 ? 'bg-red-500/10 text-red-500' : analysis.score === 1 ? 'bg-orange-500/10 text-orange-500' : analysis.score === 2 ? 'bg-yellow-500/10 text-yellow-500' : analysis.score === 3 ? 'bg-lime-500/10 text-lime-500' : 'bg-green-500/10 text-green-500'}`}>
                      {analysis.label}
                    </span>
                  </div>
                  <StrengthBar score={analysis.score} />
                </div>

                {/* Entropy & Crack Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-1 text-xs text-muted-foreground">Entropy</div>
                    <div className="text-2xl font-bold">{analysis.entropyBits} bits</div>
                  </div>
                  
                </div>

                {/* Detailed Crack Times */}
                <details className="group">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    View detailed crack time estimates
                  </summary>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Online (100/sec):</span>
                      <span className="font-medium">{humanizeCrackTimes(analysis.crackTimes).online}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offline (slow hash, bcrypt):</span>
                      <span className="font-medium">{humanizeCrackTimes(analysis.crackTimes).slowHash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offline (fast hash, GPU):</span>
                      <span className="font-medium">{humanizeCrackTimes(analysis.crackTimes).fastHash}</span>
                    </div>
                  </div>
                </details>

                {/* Feedback */}
                {analysis.suggestions.length > 0 && <div className={`flex gap-3 rounded-lg p-4 ${analysis.score >= 3 ? 'bg-green-500/10 border border-green-500/20' : 'bg-destructive/10 border border-destructive/20'}`}>
                    {analysis.score >= 3 ? <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />}
                    <div className="space-y-2">
                      <p className={`font-medium ${analysis.score >= 3 ? 'text-green-500' : 'text-destructive'}`}>
                        {analysis.score >= 3 ? 'Good password! Here are some tips:' : 'How to improve:'}
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {analysis.suggestions.map((suggestion, idx) => <li key={idx} className="flex gap-2">
                            <span>•</span>
                            <span>{suggestion}</span>
                          </li>)}
                      </ul>
                    </div>
                  </div>}
              </div>}

            {/* Breach Check Toggle */}
            {siteConfig.features.breachCheck && <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="breach-check" className="text-sm font-medium cursor-pointer">
                      Check if password appears in known breaches
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Privacy-safe using k-anonymity (only hash prefix sent)
                    </p>
                  </div>
                  <Switch id="breach-check" checked={breachCheckEnabled} onCheckedChange={setBreachCheckEnabled} />
                </div>

                {breachCheckEnabled && password && <div className="animate-fade-in">
                    {breachResult.loading ? <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground">Checking breaches...</p>
                      </div> : breachResult.error ? <div className="rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Unable to check: {breachResult.error}
                        </p>
                      </div> : breachResult.breached ? <div className="flex gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                        <div>
                          <p className="font-medium text-destructive">
                            This password has been exposed in data breaches!
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Seen {breachResult.count.toLocaleString()} times. Choose a different password.
                          </p>
                        </div>
                      </div> : <div className="flex gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-green-500">
                            No breaches found
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            This password hasn't appeared in known data breaches.
                          </p>
                        </div>
                      </div>}
                  </div>}
              </div>}
          </div>
        </div>
      </div>
    </section>;
};