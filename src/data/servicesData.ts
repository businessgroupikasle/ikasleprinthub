export interface ServiceCategory {
  id: string;
  name: string;
  image: string;
  subtitle: string;
  popular?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'business-cards',
    name: 'Business Cards',
    subtitle: 'Luxury finishes, foil stamping & thick cardstocks',
    image: '/assets/images/cat_business_cards.jpg',
    popular: true,
  },
  {
    id: 'brochures-flyers',
    name: 'Brochures & Flyers',
    subtitle: 'Tri-folds, bi-folds, gloss & matte marketing prints',
    image: '/assets/images/cat_brochures.jpg',
    popular: true,
  },
  {
    id: 'signage-banners',
    name: 'Signage & Banners',
    subtitle: 'Roll-up standees, vinyl banners & trade displays',
    image: '/assets/images/cat_signage_banners.jpg',
    popular: true,
  },
  {
    id: 'custom-gifts',
    name: 'Custom Gifts',
    subtitle: 'Branded ceramic mugs, stationery & corporate perks',
    image: '/assets/images/cat_custom_gifts.jpg',
  },
  {
    id: 'stickers-labels',
    name: 'Stickers & Labels',
    subtitle: 'Waterproof die-cut stickers & product roll labels',
    image: '/assets/images/cat_stickers_labels.jpg',
  },
  {
    id: 'packaging-boxes',
    name: 'Packaging & Boxes',
    subtitle: 'Rigid gift boxes, custom mailers & product packaging',
    image: '/assets/images/cat_packaging_boxes.jpg',
    popular: true,
  },
  {
    id: 'tshirt-printing',
    name: 'T-shirt Printing',
    subtitle: 'DTG, screen-printed & embroidered brand apparel',
    image: '/assets/images/cat_tshirt_printing.jpg',
  },
  {
    id: 'branding-solutions',
    name: 'Branding Solutions',
    subtitle: 'Stationery kits, letterheads, folders & envelopes',
    image: '/assets/images/cat_branding_solutions.jpg',
  },
];
