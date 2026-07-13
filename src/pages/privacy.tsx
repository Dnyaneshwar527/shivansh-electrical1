import { PageWrapper } from "@/components/page-wrapper";

export default function PrivacyPolicy() {
  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-4xl prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to Shivansh Electrical Works. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
      
      <h2>2. Data We Collect</h2>
      <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
      <ul>
        <li><strong>Identity Data:</strong> includes first name, last name.</li>
        <li><strong>Contact Data:</strong> includes service address, billing address, email address and telephone numbers.</li>
        <li><strong>Transaction Data:</strong> includes details about payments and other details of products and services you have purchased from us.</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to:</p>
      <ul>
        <li>Process and deliver your order/booking.</li>
        <li>Manage our relationship with you.</li>
        <li>Improve our website, products/services, marketing, customer relationships and experiences.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>

      <h2>5. Contact Details</h2>
      <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
      <p>
        Shivansh Electrical Works<br/>
        Phone: +91 8888862131<br/>
        Service Area: Pune, Maharashtra
      </p>
    </PageWrapper>
  );
}
