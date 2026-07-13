import { PageWrapper } from "@/components/page-wrapper";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, Clock, Banknote } from "lucide-react";
import { SERVICES_LIST } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Pune's Most Trusted Electrician
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Professional Electrical Services in <span className="text-primary">Wagholi & Kharadi</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Expert solutions for all your electrical needs by Datta Padul. From quick repairs to complete home wiring, we ensure safety, quality, and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  Book an Electrician
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl bg-muted border overflow-hidden shadow-xl hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
              {/* Replace with actual image in production */}
              <Zap className="h-32 w-32 text-primary opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Shivansh Electrical Works?</h2>
            <p className="text-lg text-muted-foreground">We pride ourselves on delivering top-notch service that you can rely on, day in and day out.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Licensed & Insured", desc: "Certified professionals ensuring complete safety." },
              { icon: Clock, title: "Prompt Service", desc: "Quick response times, especially for emergencies." },
              { icon: Banknote, title: "Transparent Pricing", desc: "No hidden costs. You know what you pay upfront." },
              { icon: Zap, title: "Expert Solutions", desc: "Years of experience handling complex electrical faults." }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border shadow-sm text-center">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Popular Services</h2>
              <p className="text-muted-foreground">Expert electrical work at affordable prices.</p>
            </div>
            <Link href="/services">
              <Button variant="ghost" className="hidden sm:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.slice(0, 6).map((service, i) => (
              <div key={i} className="bg-card rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold text-primary">Starts ₹{service.startingPrice}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">Professional {service.name.toLowerCase()} service by experienced technicians.</p>
                <Link href={`/book?service=${encodeURIComponent(service.name)}`}>
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/services">
              <Button variant="outline" className="w-full">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Need an Electrician Right Now?</h2>
          <p className="text-lg lg:text-xl text-primary-foreground/80 mb-10">
            We provide fast, reliable emergency electrical services. Don't wait for the problem to get worse.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:8888862131">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg font-bold">
                Call +91 8888862131
              </Button>
            </a>
            <Link href="/book">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Book Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
