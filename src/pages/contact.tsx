import { PageWrapper } from "@/components/page-wrapper";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <PageWrapper className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch with Shivansh Electrical Works for any queries, quotations, or emergency services.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Phone / WhatsApp</h3>
                <p className="text-muted-foreground mt-1">Mon-Sun, 8am to 9pm</p>
                <a href="tel:8888862131" className="text-lg font-semibold text-primary hover:underline mt-1 block">
                  +91 8888862131
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Service Areas</h3>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Primary areas: Wagholi, Kharadi, Viman Nagar, Kalyani Nagar.<br/>
                  We also serve most other parts of Pune.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Working Hours</h3>
                <p className="text-muted-foreground mt-1">Monday - Sunday: 8:00 AM - 9:00 PM</p>
                <p className="text-accent font-medium mt-1">Emergency Services Available</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email Address</h3>
                <p className="text-muted-foreground mt-1">For general enquiries</p>
                <a href="mailto:info@shivanshelectrical.com" className="font-medium text-primary hover:underline mt-1 block">
                  info@shivanshelectrical.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Send an Enquiry</h2>
          <p className="text-muted-foreground mb-8">
            Have a specific requirement or want a quotation? Send us a message and we'll get back to you shortly.
          </p>
          <div className="space-y-4">
            <Link href="/enquiry" className="inline-flex w-full h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Fill Enquiry Form
            </Link>
            <Link href="/book" className="inline-flex w-full h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              Book a Service Now
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
