import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PasswordAnalyzer } from "@/components/PasswordAnalyzer";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTASection } from "@/components/CTASection";
import { AnchorSections } from "@/components/AnchorSections";
import { Footer } from "@/components/Footer";
import { Heart } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = siteConfig.meta.title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMetaTag('description', siteConfig.meta.description);
    updateMetaTag('keywords', siteConfig.meta.keywords);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <PasswordAnalyzer />
        <Features />
        <HowItWorks />
        <AnchorSections />
        <CTASection />
      </main>

      <Footer />

      {/* Lovable Badge */}
      <a
        href="https://lovable.dev"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 px-4 py-2 text-sm font-medium shadow-lg hover:shadow-glow-sm transition-all duration-200 hover:-translate-y-0.5"
      >
        <span className="text-muted-foreground">Edit with</span>
        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        <span className="font-semibold gradient-primary bg-clip-text text-transparent">
          Lovable
        </span>
      </a>
    </div>
  );
};

export default Index;
