import { PageWrapper } from "@/components/page-wrapper";
import { useGetCurrentUser, useGetAdminStats, useListAdminBookings, useListCustomers, useListEnquiries, useUpdateBooking, getListAdminBookingsQueryKey, getGetAdminStatsQueryKey } from "@workspace/api-client-react";
import type { ListAdminBookingsResponseItem } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Users, Calendar, CheckSquare, IndianRupee, LogOut, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function buildAdminWhatsAppUrl(b: ListAdminBookingsResponseItem): string {
  const msg = [
    `*New Booking Alert - Shivansh Electrical Works*`,
    ``,
    `Booking ID: ${b.bookingId}`,
    `Customer: ${b.customerName}`,
    `Mobile: ${b.mobile}`,
    `Service: ${b.service}`,
    `Date: ${b.preferredDate}`,
    `Time: ${b.preferredTime}`,
    `Address: ${b.address}, ${b.area}, ${b.city}${b.pincode ? ` - ${b.pincode}` : ""}`,
    b.problemDescription ? `Issue: ${b.problemDescription}` : "",
    `Status: ${b.status}`,
  ].filter(Boolean).join("\n");
  return `https://wa.me/918888862131?text=${encodeURIComponent(msg)}`;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetCurrentUser({
    query: { retry: false }
  });

  useEffect(() => {
    if (isUserError || (user && user.role !== "admin")) {
      setLocation("/admin");
    }
  }, [isUserError, user, setLocation]);

  const { data: stats } = useGetAdminStats({ query: { enabled: user?.role === "admin" } });
  const { data: bookings } = useListAdminBookings({ query: { enabled: user?.role === "admin" } });
  const { data: customers } = useListCustomers({ query: { enabled: user?.role === "admin" } });
  const { data: enquiries } = useListEnquiries({ query: { enabled: user?.role === "admin" } });
  
  const updateBooking = useUpdateBooking();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin";
  };

  const handleStatusChange = (id: number, status: any) => {
    updateBooking.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          toast({ title: "Status updated successfully" });
          queryClient.invalidateQueries({ queryKey: getListAdminBookingsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        },
        onError: () => {
          toast({ title: "Failed to update status", variant: "destructive" });
        }
      }
    );
  };

  if (isUserLoading || !user || user.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const filteredBookings = bookings?.filter(b => 
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.mobile.includes(searchTerm)
  ) || [];

  return (
    <PageWrapper className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-destructive">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage bookings, customers, and overall business operations.</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout Admin
        </Button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Jobs</p>
                <h3 className="text-2xl font-bold">{stats.pendingJobs}</h3>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <IndianRupee className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">₹{stats.totalRevenue}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-semibold text-lg">All Bookings</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ID, Name, Mobile..." 
                className="pl-9 h-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Notify</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? filteredBookings.map((b) => (
                  <TableRow key={b.id} className={b.status === "pending" ? "bg-yellow-50/40 dark:bg-yellow-900/10" : ""}>
                    <TableCell className="font-medium">
                      <span>{b.bookingId}</span>
                      {b.status === "pending" && (
                        <Badge className="ml-2 bg-yellow-500 text-white text-[10px] px-1.5 py-0">New</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {b.customerName}<br/>
                      <a href={`tel:${b.mobile}`} className="text-xs text-primary hover:underline">{b.mobile}</a>
                    </TableCell>
                    <TableCell>{b.service}</TableCell>
                    <TableCell>
                      {b.preferredDate}<br/>
                      <span className="text-xs text-muted-foreground">{b.preferredTime}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`
                        ${b.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                        ${b.status === 'confirmed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        ${b.status === 'in_progress' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                        ${b.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${b.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      `}>
                        {b.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={b.status}
                        onValueChange={(v) => handleStatusChange(b.id, v)}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <a href={buildAdminWhatsAppUrl(b)} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="h-8 px-2 border-green-400 text-green-600 hover:bg-green-50 hover:text-green-700">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                      </a>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">No bookings found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20">
            <h2 className="font-semibold text-lg">Registered Customers</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Registered On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers && customers.length > 0 ? customers.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.id}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.mobile}</TableCell>
                    <TableCell>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">No customers found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="enquiries" className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/20">
            <h2 className="font-semibold text-lg">Contact Enquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name & Contact</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries && enquiries.length > 0 ? enquiries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="whitespace-nowrap">{new Date(e.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="font-medium">{e.name}</span><br/>
                      <span className="text-xs text-muted-foreground">{e.mobile} | {e.email}</span>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate hover:whitespace-normal">{e.message}</p>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">No enquiries found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
