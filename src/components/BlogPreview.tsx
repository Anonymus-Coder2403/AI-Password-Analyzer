import { ArrowRight, Calendar } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

const posts = [
  {
    title: "The Anatomy of a Strong Password",
    excerpt: "Learn what makes a password truly secure and how to create unbreakable credentials.",
    date: "Mar 15, 2024",
    href: "/blog",
  },
  {
    title: "Common Password Mistakes to Avoid",
    excerpt: "Discover the most common password pitfalls and how to avoid them for better security.",
    date: "Mar 10, 2024",
    href: "/blog",
  },
  {
    title: "Understanding Password Entropy",
    excerpt: "A deep dive into password entropy and why it matters more than you think.",
    date: "Mar 5, 2024",
    href: "/blog",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex items-end justify-between max-w-6xl mx-auto">
          <div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Latest from Our Blog
            </h2>
            <p className="text-muted-foreground text-lg">
              Security tips, guides, and best practices
            </p>
          </div>
          <GradientButton asChild variant="outline" className="hidden md:inline-flex">
            <a href="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </a>
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              className="group rounded-2xl bg-card border border-border/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-sm animate-fade-in block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar className="h-3.5 w-3.5" />
                <time>{post.date}</time>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                Read More
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <GradientButton asChild variant="outline">
            <a href="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </a>
          </GradientButton>
        </div>
      </div>
    </section>
  );
};
