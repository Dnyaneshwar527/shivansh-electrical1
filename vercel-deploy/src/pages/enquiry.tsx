import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateEnquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Enquiry() {
  const { toast } = useToast();
  const createEnquiry = useCreateEnquiry();

  const form = useForm<z.infer<typeof enquirySchema>>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof enquirySchema>) => {
    createEnquiry.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Enquiry Sent!",
          description: "We have received your message and will get back to you shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Failed to send",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Send an Enquiry</h1>
        <p className="text-muted-foreground">Have a question or need a custom quote? Let us know.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" {...form.register("name")} placeholder="John Doe" />
            {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input id="mobile" {...form.register("mobile")} placeholder="9876543210" />
            {form.formState.errors.mobile && <p className="text-sm text-destructive">{form.formState.errors.mobile.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message / Requirement *</Label>
            <Textarea id="message" {...form.register("message")} placeholder="Describe what you need help with..." rows={5} />
            {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={createEnquiry.isPending}>
            {createEnquiry.isPending ? "Sending..." : <><Send className="mr-2 h-5 w-5" /> Send Enquiry</>}
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
}
