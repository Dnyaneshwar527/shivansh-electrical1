import { PageWrapper } from "@/components/page-wrapper";
import { useGetCurrentUser, useListBookings } from "@workspace/api-client-react";
import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Wrench, XCircle, LogOut, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetCurrentUser({
    query: {
      retry: false
    }
  });

  const { data: bookings, isLoading: isBookingsLoading } = useListBookings({
    query: {
      enabled: !!user
    }
  });

  useEffect(() => {
    if (isUserError) {
      setLocation("/login");
    }
  }, [isUserError, setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (isUserLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "confirmed": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case "in_progress": return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">In Progress</Badge>;
      case "completed": return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled": return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PageWrapper className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/book">
            <Button>Book New Service</Button>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-center font-semibold text-lg mb-1">{user.name}</h3>
            <p className="text-center text-sm text-muted-foreground mb-6">{user.email}</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Mobile:</span>
                <span className="font-medium">{user.mobile}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Role:</span>
                <span className="font-medium capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-muted/30">
              <h2 className="font-semibold text-lg">My Bookings</h2>
            </div>
            
            {isBookingsLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading bookings...</div>
            ) : bookings && bookings.length > 0 ? (
              <div className="divide-y">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-muted/10 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg">{booking.service}</span>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {booking.bookingId}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="font-medium">{new Date(booking.preferredDate).toLocaleDateString()} at {booking.preferredTime}</p>
                        <p className="text-sm text-muted-foreground">{booking.area}</p>
                      </div>
                    </div>
                    {booking.assignedTechnician && (
                      <div className="bg-primary/5 px-4 py-2 rounded-lg text-sm inline-flex items-center text-primary mt-2">
                        <Wrench className="h-4 w-4 mr-2" />
                        Technician Assigned: <span className="font-semibold ml-1">{booking.assignedTechnician}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-muted-foreground mb-4">You don't have any bookings yet.</p>
                <Link href="/book">
                  <Button variant="outline">Book a Service</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
