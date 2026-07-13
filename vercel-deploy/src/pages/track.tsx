import { useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTrackBooking } from "@workspace/api-client-react";
import { Search, CheckCircle2, Clock, Wrench, XCircle } from "lucide-react";

export default function Track() {
  const [identifier, setIdentifier] = useState("");
  const trackBooking = useTrackBooking();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    
    const isMobile = /^\d{10}$/.test(identifier);
    trackBooking.mutate({
      data: isMobile ? { mobile: identifier } : { bookingId: identifier }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-6 w-6 text-yellow-500" />;
      case "confirmed": return <CheckCircle2 className="h-6 w-6 text-blue-500" />;
      case "in_progress": return <Wrench className="h-6 w-6 text-purple-500" />;
      case "completed": return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "cancelled": return <XCircle className="h-6 w-6 text-red-500" />;
      default: return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const booking = trackBooking.data;

  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Track Your Booking</h1>
        <p className="text-muted-foreground">Enter your Booking ID or Mobile Number to check status.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm mb-8">
        <form onSubmit={handleTrack} className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="identifier" className="sr-only">Booking ID or Mobile</Label>
            <Input 
              id="identifier" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. BK-123456 or 9876543210" 
              className="h-12 text-base"
            />
          </div>
          <Button type="submit" className="h-12 px-6" disabled={trackBooking.isPending}>
            <Search className="h-5 w-5 mr-2" />
            Track
          </Button>
        </form>
      </div>

      {trackBooking.isError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-center">
          Could not find any booking with that ID/Number. Please check and try again.
        </div>
      )}

      {booking && (
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Booking ID</p>
              <p className="text-xl font-bold">{booking.bookingId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(booking.status)}
                <span className="font-semibold uppercase tracking-wider text-sm">{booking.status.replace("_", " ")}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">{booking.service}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled For</p>
              <p className="font-medium">{new Date(booking.preferredDate).toLocaleDateString()} ({booking.preferredTime})</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{booking.address}, {booking.area}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Technician</p>
              <p className="font-medium">{booking.assignedTechnician || "Not assigned yet"}</p>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
