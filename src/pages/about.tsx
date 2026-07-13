import { PageWrapper } from "@/components/page-wrapper";
import { Link } from "wouter";

export default function About() {
  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-6">About Shivansh Electrical Works</h1>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Led by Datta Padul, Shivansh Electrical Works has been a trusted name in electrical services across Wagholi, Kharadi, and Pune. We believe that electrical safety and reliability are non-negotiable.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            From quick residential fixes to comprehensive commercial wiring, our mission is to provide prompt, professional, and transparent services without cutting corners.
          </p>
          <div className="flex gap-4">
            <Link href="/book" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Book a Service
            </Link>
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-muted border">
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            {/* Placeholder for actual image */}
            <span className="text-muted-foreground/50 font-medium text-lg">Professional Electrical Services</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-primary">Our Mission</h3>
          <p className="text-muted-foreground">
            To deliver premium, safe, and efficient electrical solutions to every household and business in Pune, ensuring absolute customer satisfaction.
          </p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-primary">Our Vision</h3>
          <p className="text-muted-foreground">
            To become the most reliable and technologically adept electrical service provider in Maharashtra, setting the benchmark for quality and safety.
          </p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-primary">Safety First</h3>
          <p className="text-muted-foreground">
            We adhere strictly to all safety protocols and use only certified, high-grade materials to protect your property from electrical hazards.
          </p>
        </div>
      </div>

      <div className="bg-primary/5 p-8 rounded-2xl border text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mt-8">
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-medium text-foreground">Experienced & Licensed Electricians</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-medium text-foreground">Transparent & Upfront Pricing</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-medium text-foreground">Quick Emergency Response</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-medium text-foreground">100% Satisfaction Guarantee</span>
          </li>
        </ul>
      </div>
    </PageWrapper>
  );
}
