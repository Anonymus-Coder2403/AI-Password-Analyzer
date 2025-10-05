import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By using SecurePass Checker, you agree to these terms of service. If you do not
                  agree, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Service Description</h2>
                <p className="text-muted-foreground">
                  SecurePass Checker provides a free, browser-based password strength analysis tool.
                  We make no guarantees about the absolute security of any password and recommend
                  using additional security measures like two-factor authentication.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The service is provided "as is" without warranties of any kind. We are not
                  responsible for:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Security breaches resulting from weak passwords</li>
                  <li>• Accuracy of crack time estimates</li>
                  <li>• Availability or uptime of the service</li>
                  <li>• Third-party breach detection services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the security of your passwords and accounts.
                  Our tool provides guidance, but ultimately password security is your responsibility.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Continued use of the
                  service constitutes acceptance of updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p className="text-muted-foreground">
                  Questions about these terms? Contact us at legal@securepass-checker.com
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

export default Terms;
