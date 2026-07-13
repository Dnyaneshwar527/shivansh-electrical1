import { Phone, MessageCircle } from "lucide-react";

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/918888862131"
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <a
        href="tel:8888862131"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Call Us"
      >
        <Phone className="h-7 w-7" />
      </a>
    </div>
  );
}
