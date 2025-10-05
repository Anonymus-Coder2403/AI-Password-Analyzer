/**
 * Anchor sections for navigation links
 * These provide smooth scroll targets for nav menu items
 */

export const AnchorSections = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 bg-panel/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">About SecurePass</h2>
            <p className="text-lg text-muted-foreground mb-6">
              SecurePass Checker is a privacy-first password strength analyzer designed to help
              individuals and organizations improve their password security. All analysis happens
              locally in your browser, ensuring your passwords never leave your device.
            </p>
            <p className="text-muted-foreground">
              Built by security professionals, our tool uses advanced algorithms to evaluate
              password entropy, detect common patterns, and estimate crack times based on real-world
              attack scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Integrations</h2>
            <p className="text-lg text-muted-foreground mb-6">
              SecurePass integrates seamlessly with your existing security infrastructure.
              Our API allows you to embed password strength checking into registration forms,
              password reset flows, and security dashboards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {['React', 'Vue', 'Angular', 'REST API'].map((tech) => (
                <div key={tech} className="rounded-lg bg-card border border-border/50 p-4">
                  <p className="font-medium">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section id="customers" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Trusted by Millions</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Organizations and individuals worldwide rely on SecurePass Checker to improve
              their password security practices.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                2M+
              </div>
              <p className="text-muted-foreground">Passwords analyzed monthly</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
