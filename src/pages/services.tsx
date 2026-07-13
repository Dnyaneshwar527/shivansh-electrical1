import { PageWrapper } from "@/components/page-wrapper";
import { SERVICES_LIST } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Zap, Search } from "lucide-react";
import { useState } from "react";
// import { useListServices } from "@workspace/api-client-react"; // Ideally fetch from API

export default function Services() {
  const [search, setSearch] = useState("");
  // const { data: services, isLoading } = useListServices();
  const services = SERVICES_LIST; // Using constants as fallback
  
  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Electrical Services</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive electrical solutions for your home and business. All services are performed by skilled, licensed professionals.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 text-base" 
          placeholder="Search for a service... (e.g. House Wiring)" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No services found matching "{search}".</p>
          <Button variant="link" onClick={() => setSearch("")} className="mt-2">Clear search</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, i) => (
            <div key={i} className="bg-card rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-primary text-sm bg-primary/5 px-2 py-1 rounded">Starts ₹{service.startingPrice}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">Professional and safe {service.name.toLowerCase()} for residential and commercial properties.</p>
              <Link href={`/book?service=${encodeURIComponent(service.name)}`}>
                <Button className="w-full" variant="outline">Book Service</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
