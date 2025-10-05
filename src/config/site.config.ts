export const siteConfig = {
  name: "SecurePass Checker",
  shortName: "SecurePass",
  description: "Privacy-first password strength analyzer with real-time security insights",
  url: "https://securepass-checker.com",
  
  nav: {
    main: [
      { label: "About", href: "/#about" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Customers", href: "/#customers" },
      { label: "Changelog", href: "/docs#changelog" },
    ],
    auth: [
      { label: "Sign in", href: "/signin", variant: "ghost" as const },
      { label: "Sign up", href: "/signup", variant: "default" as const },
    ],
  },
  
  footer: {
    product: [
      { label: "Password Checker", href: "/#analyzer" },
      { label: "Password Generator", href: "/generator" },
      { label: "Security Tips", href: "/best-practices" },
      { label: "API Access", href: "/docs#api" },
    ],
    resources: [
      { label: "Security Guide", href: "/security-guide" },
      { label: "Best Practices", href: "/best-practices" },
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
    ],
    company: [
      { label: "About", href: "/#about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
  
  social: {
    twitter: "https://twitter.com/securepass",
    github: "https://github.com/securepass",
    linkedin: "https://linkedin.com/company/securepass",
  },
  
  features: {
    breachCheck: true,  // Toggle to show/hide breach check UI
    analytics: false,   // Analytics stub (off by default)
  },
  
  meta: {
    title: "SecurePass Checker - Privacy-First Password Strength Analyzer",
    description: "Analyze your password strength instantly with our privacy-first tool. Get real-time security insights, crack time estimates, and breach detection.",
    keywords: "password strength, password checker, security analyzer, password security, breach detection",
    ogImage: "/og-image.png",
  },
};
