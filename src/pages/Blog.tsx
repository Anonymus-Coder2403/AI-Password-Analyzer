import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "The Evolution of Password Security in 2025",
    excerpt: "Exploring how password security practices have changed and what you need to know to stay protected in the modern digital landscape.",
    date: "January 15, 2025",
    slug: "evolution-password-security-2025",
  },
  {
    title: "Understanding Password Entropy: A Technical Deep Dive",
    excerpt: "Learn what makes a password truly random and how entropy calculations help measure password strength effectively.",
    date: "January 8, 2025",
    slug: "understanding-password-entropy",
  },
];

const Blog = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
              <p className="text-xl text-muted-foreground">
                Insights and updates on password security
              </p>
            </div>

            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  className="rounded-2xl bg-card border border-border/50 p-8 hover:shadow-glow-sm transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <time>{post.date}</time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                  <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                  <Button variant="outline" asChild>
                    <a href={`/blog/${post.slug}`} className="flex items-center gap-2">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
