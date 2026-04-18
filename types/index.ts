export interface FAQItem {
  title: string;
  body: string;
}

export interface Partner {
  name: string;
  image: string;
}

export interface ComparisonItem {
  criteria: string;
  traditional: string;
  zentrix: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  [category: string]: string[];
}

export interface Social {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export interface MapDot {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}
