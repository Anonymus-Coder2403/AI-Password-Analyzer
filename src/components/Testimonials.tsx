import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This tool helped me understand password security in a way I never did before. The real-time feedback is incredible!",
    author: "Sarah Chen",
    role: "Security Engineer",
    avatar: "SC",
  },
  {
    quote: "Finally, a password checker that respects privacy. No data leaves my browser, and I get instant, actionable insights.",
    author: "Marcus Rodriguez",
    role: "Privacy Advocate",
    avatar: "MR",
  },
  {
    quote: "The breach detection feature saved me. I had no idea my password was compromised until I tried this analyzer.",
    author: "Emily Johnson",
    role: "Small Business Owner",
    avatar: "EJ",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-panel/30">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Trusted by Security-Conscious Users
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands who've improved their password security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-card border border-border/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-sm animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
