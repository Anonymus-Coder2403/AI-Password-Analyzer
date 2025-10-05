import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                Get in touch with our team
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <Mail className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    hello@securepass-checker.com
                  </p>
                </div>

                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <MessageSquare className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-sm text-muted-foreground">
                    support@securepass-checker.com
                  </p>
                </div>

                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <MapPin className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    San Francisco, CA
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form className="rounded-2xl bg-card border border-border/50 p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-primary hover:shadow-glow transition-all duration-200"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
