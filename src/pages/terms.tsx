import { PageWrapper } from "@/components/page-wrapper";

export default function TermsConditions() {
  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-4xl prose dark:prose-invert">
      <h1>Terms & Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using the Shivansh Electrical Works website and booking our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <h2>2. Services</h2>
      <p>Shivansh Electrical Works provides electrical installation, repair, and maintenance services. The prices listed on the website are starting prices. The final price will be determined after inspection of the site by our technician.</p>

      <h2>3. Booking and Cancellation</h2>
      <ul>
        <li>Bookings are subject to the availability of technicians.</li>
        <li>Cancellations should be made at least 2 hours prior to the scheduled visit.</li>
        <li>A minimum visiting charge may apply if the customer decides not to proceed with the work after the technician has arrived and diagnosed the problem.</li>
      </ul>

      <h2>4. Payment</h2>
      <p>Payment for services rendered must be made immediately upon completion of the work, unless otherwise agreed in writing. We accept cash, UPI, and online bank transfers.</p>

      <h2>5. Liability and Warranty</h2>
      <p>We warrant that all services will be performed in a professional and workmanlike manner. We use high-quality materials. However, we are not liable for any pre-existing faults in your electrical system or damages caused by third-party materials provided by the customer.</p>

      <h2>6. Governing Law</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra.</p>
    </PageWrapper>
  );
}
