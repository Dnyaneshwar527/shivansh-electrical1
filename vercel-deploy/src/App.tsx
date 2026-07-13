import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingActionButtons } from "@/components/floating-action-buttons";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import PrivacyPolicy from "@/pages/privacy";
import TermsConditions from "@/pages/terms";
import Book from "@/pages/book";
import Track from "@/pages/track";
import Enquiry from "@/pages/enquiry";
import Reviews from "@/pages/reviews";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import AdminLogin from "@/pages/admin";
import AdminDashboard from "@/pages/admin-dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/book" component={Book} />
          <Route path="/track" component={Track} />
          <Route path="/contact" component={Contact} />
          <Route path="/enquiry" component={Enquiry} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={FAQ} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsConditions} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
