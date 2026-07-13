import { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateBooking } from "@workspace/api-client-react";
import type { CreateBookingResponse } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { SERVICES_LIST, AREAS, TIME_SLOTS } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLocation } from "wouter";

const OWNER_WHATSAPP = "918888862131";

function buildWhatsAppUrl(booking: CreateBookingResponse): string {
  const msg = [
    `Hello Datta Padul,`,
    ``,
    `I have just booked a service on Shivansh Electrical Works.`,
    ``,
    `*Booking Details:*`,
    `Booking ID: ${booking.bookingId}`,
    `Name: ${booking.customerName}`,
    `Mobile: ${booking.mobile}`,
    `Service: ${booking.service}`,
    `Date: ${booking.preferredDate}`,
    `Time: ${booking.preferredTime}`,
    `Address: ${booking.address}, ${booking.area}, ${booking.city}${booking.pincode ? ` - ${booking.pincode}` : ""}`,
    booking.problemDescription ? `Issue: ${booking.problemDescription}` : "",
    ``,
    `Please confirm my booking. Thank you!`,
  ].filter((l) => l !== undefined).join("\n");

  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  area: z.string().min(1, "Area is required"),
  city: z.string().default("Pune"),
  pincode: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time slot"),
  problemDescription: z.string().optional()
});

export default function Book() {
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  const [successBooking, setSuccessBooking] = useState<CreateBookingResponse | null>(null);
  const [, setLocation] = useLocation();

  // URL search params for default service
  const params = new URLSearchParams(window.location.search);
  const defaultService = params.get("service") || "";

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      mobile: "",
      email: "",
      address: "",
      area: "",
      city: "Pune",
      pincode: "",
      service: defaultService,
      preferredDate: new Date().toISOString().split("T")[0],
      preferredTime: "",
      problemDescription: ""
    }
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    createBooking.mutate({ data }, {
      onSuccess: (res) => {
        setSuccessBooking(res);
      },
      onError: () => {
        toast({
          title: "Booking failed",
          description: "Something went wrong. Please try again or call us.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Book an Electrician</h1>
        <p className="text-muted-foreground">Fill out the form below to schedule a service visit.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Full Name *</Label>
              <Input id="customerName" {...form.register("customerName")} placeholder="John Doe" />
              {form.formState.errors.customerName && <p className="text-sm text-destructive">{form.formState.errors.customerName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input id="mobile" {...form.register("mobile")} placeholder="9876543210" />
              {form.formState.errors.mobile && <p className="text-sm text-destructive">{form.formState.errors.mobile.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Flat, Building, Street *</Label>
            <Input id="address" {...form.register("address")} placeholder="101, A Wing, Silver Heights" />
            {form.formState.errors.address && <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Area / Locality *</Label>
              <Select onValueChange={(v) => form.setValue("area", v)} defaultValue={form.getValues("area")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
              {form.formState.errors.area && <p className="text-sm text-destructive">{form.formState.errors.area.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" {...form.register("pincode")} placeholder="412207" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service Required *</Label>
            <Select onValueChange={(v) => form.setValue("service", v)} defaultValue={form.getValues("service")}>
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES_LIST.map(s => <SelectItem key={s.name} value={s.name}>{s.name} (Starts ₹{s.startingPrice})</SelectItem>)}
              </SelectContent>
            </Select>
            {form.formState.errors.service && <p className="text-sm text-destructive">{form.formState.errors.service.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date *</Label>
              <Input id="preferredDate" type="date" {...form.register("preferredDate")} min={new Date().toISOString().split("T")[0]} />
              {form.formState.errors.preferredDate && <p className="text-sm text-destructive">{form.formState.errors.preferredDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Preferred Time *</Label>
              <Select onValueChange={(v) => form.setValue("preferredTime", v)} defaultValue={form.getValues("preferredTime")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time Slot" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              {form.formState.errors.preferredTime && <p className="text-sm text-destructive">{form.formState.errors.preferredTime.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemDescription">Problem Description (Optional)</Label>
            <Textarea id="problemDescription" {...form.register("problemDescription")} placeholder="Describe the issue in detail..." rows={3} />
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={createBooking.isPending}>
            {createBooking.isPending ? "Submitting..." : "Confirm Booking"}
          </Button>
        </form>
      </div>

      <Dialog open={!!successBooking} onOpenChange={(open) => { if (!open) { setSuccessBooking(null); setLocation("/track"); } }}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-2">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center text-base">
              Your booking has been placed. Send a WhatsApp message to confirm it instantly with Datta Padul.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-1">Your Booking ID is:</p>
            <p className="text-3xl font-bold tracking-wider text-primary mb-4">{successBooking?.bookingId}</p>
            <div className="text-left bg-muted rounded-lg p-3 text-sm space-y-1 text-muted-foreground">
              <p><span className="font-medium text-foreground">Service:</span> {successBooking?.service}</p>
              <p><span className="font-medium text-foreground">Date:</span> {successBooking?.preferredDate}</p>
              <p><span className="font-medium text-foreground">Time:</span> {successBooking?.preferredTime}</p>
              <p><span className="font-medium text-foreground">Area:</span> {successBooking?.area}, {successBooking?.city}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={successBooking ? buildWhatsAppUrl(successBooking) : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold text-base">
                Send WhatsApp Confirmation
              </Button>
            </a>
            <Button onClick={() => { setSuccessBooking(null); setLocation("/track"); }} className="w-full h-11">
              Track Booking Status
            </Button>
            <Button variant="outline" onClick={() => { setSuccessBooking(null); setLocation("/"); }} className="w-full">
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
