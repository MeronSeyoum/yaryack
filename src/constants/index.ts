import type { ProcessStep, Service, Stat } from "../types";


export const STATS: Stat[] = [
  { number: "5+", label: "Years of Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "1000+", label: "Photos Captured" },
  { number: "50+", label: "Events Covered" },
];

export const SERVICES: Service[] = [
  {
    name: "Portrait Session",
    description: "Perfect for individual portraits, family photos, and professional headshots",
    price: "$250",
    features: [
      "1-2 hour session",
      "1 location",
      "30+ edited photos",
      "Online gallery access",
      "High-resolution downloads",
      "Print release"
    ],
  },
  {
    name: "Event Photography",
    description: "Comprehensive coverage for corporate events, parties, and special occasions",
    price: "$400",
    features: [
      "3-4 hour coverage",
      "Multiple locations",
      "100+ edited photos",
      "Online gallery access",
      "Quick turnaround",
      "Professional editing"
    ],
  },
  {
    name: "Wedding Package",
    description: "Complete wedding day coverage from preparation to reception",
    price: "$1200",
    features: [
      "8+ hour coverage",
      "Two photographers",
      "300+ edited photos",
      "Premium online gallery",
      "Print package included",
      "Engagement session"
    ],
  },
  
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation & Booking",
    description: "We discuss your vision, timeline, and requirements to create the perfect photography plan.",
  },
  {
    number: "02",
    title: "The Photoshoot",
    description: "A comfortable and professional session where we capture authentic moments and creative compositions.",
  },
  {
    number: "03",
    title: "Editing & Enhancement",
    description: "Professional editing and color correction to bring out the best in your photographs.",
  },
  {
    number: "04",
    title: "Delivery & Support",
    description: "Your final photos delivered through a private online gallery with options for prints.",
  },
];