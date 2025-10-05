import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Your Privacy is Our Priority</h2>
                <p className="text-muted-foreground">
                  At SecurePass Checker, we take your privacy seriously. This policy explains how we
                  handle your data when you use our password strength analyzer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Password Analysis</h2>
                <p className="text-muted-foreground mb-4">
                  All password strength analysis is performed <strong>locally in your browser</strong>.
                  We never receive, store, or transmit your passwords to our servers or any third party.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Passwords are analyzed using JavaScript in your browser</li>
                  <li>• No password data is logged, stored, or transmitted</li>
                  <li>• Analysis happens entirely on your device</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Breach Detection (Optional)</h2>
                <p className="text-muted-foreground">
                  When you opt-in to breach detection, we use k-anonymity to check your password
                  against known breaches. Only the first 5 characters of your password's SHA-1 hash
                  are sent to the Have I Been Pwned API. This makes it impossible to determine your
                  actual password from the request.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Analytics & Cookies</h2>
                <p className="text-muted-foreground">
                  We may collect anonymous usage statistics to improve our service, such as page
                  views and feature usage. We do not use tracking cookies or collect personally
                  identifiable information without your consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p className="text-muted-foreground">
                  If you have questions about this privacy policy, please contact us at
                  privacy@securepass-checker.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
