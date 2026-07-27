export interface Product {
  id: string;
  nameKey: string; // Key in translations object
  descriptionKey: string; // Key in translations object
  price: number; // Base price in RM (Malaysian Ringgit)
  rating: number; // e.g., 4.9
  reviewsCount: number; // e.g., 142
  image: string; // URL or path
  category: 'signature' | 'classic' | 'crunchy';
  tags: string[]; // e.g., ['Best Seller', 'New']
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'en' | 'ms';

export interface Testimonial {
  id: string;
  name: string;
  roleKey: string;
  textKey: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}
