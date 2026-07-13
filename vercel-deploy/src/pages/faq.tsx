import { PageWrapper } from "@/components/page-wrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

const faqs = [
  {
    question: "What are your operating hours?",
    answer: "We operate Monday to Sunday, from 8:00 AM to 9:00 PM. We also provide emergency electrical services outside of these hours if needed."
  },
  {
    question: "Do you serve areas outside Wagholi and Kharadi?",
    answer: "Our primary service areas are Wagholi and Kharadi, but we cover most major locations in Pune. Please contact us to confirm if we can serve your specific location."
  },
  {
    question: "How do you charge for your services?",
    answer: "We have transparent, upfront pricing. The minimum visiting and inspection charge starts at ₹149. The final price depends on the specific service, materials required, and the extent of the electrical work."
  },
  {
    question: "Do you provide materials or should I buy them?",
    answer: "You can provide your own materials, or we can procure high-quality, genuine electrical materials for you at market rates. We always recommend using branded materials for safety."
  },
  {
    question: "Are your electricians certified and experienced?",
    answer: "Yes, Datta Padul and the team at Shivansh Electrical Works are highly experienced and trained professionals handling everything from residential to industrial electrical systems safely."
  },
  {
    question: "How fast can you respond to an emergency?",
    answer: "For emergency electrical issues like short circuits or total power failures in our primary service areas, we aim to reach your location within 30 to 60 minutes."
  }
];

export default function FAQ() {
  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our electrical services.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-16 text-center bg-muted/50 rounded-2xl p-8 border">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Can't find the answer you're looking for? Please chat to our friendly team.
        </p>
        <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          Contact Us
        </Link>
      </div>
    </PageWrapper>
  );
}
