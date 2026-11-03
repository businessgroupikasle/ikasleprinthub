export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  specs: string;
  client: string;
  turnaround: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-cards',
    title: 'Business Cards',
    subtitle: 'Corporate Branding',
    image: '/assets/images/work_business_cards.jpg',
    specs: '600gsm Cotton Stock • Gold & Navy Foil • Painted Edges',
    client: 'Apex Capital Partners',
    turnaround: '48 Hours',
  },
  {
    id: 'portfolio-brochures',
    title: 'Brochures',
    subtitle: 'Marketing Materials',
    image: '/assets/images/work_brochures.jpg',
    specs: '250gsm Silk Cover • Soft-Touch Matte • Spot UV Accents',
    client: 'Veridian Architecture Studio',
    turnaround: '3 Days',
  },
  {
    id: 'portfolio-packaging',
    title: 'Packaging',
    subtitle: 'Product Packaging',
    image: '/assets/images/work_packaging.jpg',
    specs: 'Rigid Cardboard • Custom Die-Cut • Embossed Pattern Foil',
    client: 'Aura Luxury Botanicals',
    turnaround: '5 Days',
  },
  {
    id: 'portfolio-signage',
    title: 'Signage',
    subtitle: 'Retail & Outdoor',
    image: '/assets/images/work_signage.jpg',
    specs: 'Circular Lightbox • Double-Sided LED • Weatherproof Acrylic',
    client: 'Monolith Design Labs',
    turnaround: '4 Days',
  },
  {
    id: 'portfolio-gifts',
    title: 'Custom Gifts',
    subtitle: 'Branded Merchandise',
    image: '/assets/images/work_custom_gifts.jpg',
    specs: 'Premium Ceramic • Sublimation Printing • Microwave Safe',
    client: 'Starlight Tech Solutions',
    turnaround: '24 Hours',
  },
];
