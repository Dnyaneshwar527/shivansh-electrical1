import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-primary">Shivansh Electrical Works</h3>
            <p className="mt-4 text-muted-foreground">
              Professional electrical services in Wagholi, Kharadi, and Pune. We provide safe, reliable, and high-quality solutions for residential, commercial, and industrial needs.
            </p>
            <p className="mt-2 font-medium text-accent">By Datta Padul</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">All Services</Link>
              </li>
              <li>
                <Link href="/book" className="text-muted-foreground transition-colors hover:text-primary">Book Electrician</Link>
              </li>
              <li>
                <Link href="/track" className="text-muted-foreground transition-colors hover:text-primary">Track Booking</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Wagholi, Kharadi, Pune, Maharashtra</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:8888862131" className="text-muted-foreground transition-colors hover:text-primary">+91 8888862131</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@shivanshelectrical.com" className="text-muted-foreground transition-colors hover:text-primary">info@shivanshelectrical.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shivansh Electrical Works. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground md:mt-0">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
            <Link href="/admin" className="hover:text-primary">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
