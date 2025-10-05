import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my password sent to your servers?",
    answer: "No, never. All password analysis happens locally in your browser using JavaScript. Your password never leaves your device, ensuring complete privacy.",
  },
  {
    question: "How does the breach detection work?",
    answer: "We use k-anonymity to check passwords against the Have I Been Pwned database. Only the first 5 characters of your password's hash are sent, making it impossible to determine your actual password.",
  },
  {
    question: "What makes a password strong?",
    answer: "A strong password is at least 12 characters long, uses a mix of uppercase, lowercase, numbers, and symbols, avoids common words or patterns, and isn't reused across multiple accounts.",
  },
  {
    question: "How accurate are the crack time estimates?",
    answer: "Our estimates are based on current attack speeds and methods. Online attacks (100/sec), offline bcrypt (10k/sec), and fast GPU attacks (10B/sec) give you realistic worst-case scenarios.",
  },
  {
    question: "Can I use this tool for work?",
    answer: "Yes! The free version is perfect for personal and professional use. For teams, consider our Pro plan which includes audit history and reporting features.",
  },
  {
    question: "Do you store any data about me?",
    answer: "We don't store passwords or personal information. We may collect anonymous usage statistics (like page views) to improve the service, but never the passwords you analyze.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 md:py-32 bg-panel/30">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about password security
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl bg-card border border-border/50 px-6 data-[state=open]:shadow-glow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
