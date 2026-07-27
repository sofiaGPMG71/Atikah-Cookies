import { Testimonial, FAQItem, WhyChooseUsItem } from './types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Siti Sarah',
    roleKey: 'review.role1',
    textKey: 'review.text1',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: '2',
    name: 'Marcus Lim',
    roleKey: 'review.role2',
    textKey: 'review.text2',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: '3',
    name: 'Aishah Rahman',
    roleKey: 'review.role3',
    textKey: 'review.text3',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
  }
];

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: 'fresh-ingredients',
    icon: 'Sparkles',
    titleKey: 'why.feat1_title',
    descriptionKey: 'why.feat1_desc',
  },
  {
    id: 'homemade-quality',
    icon: 'Heart',
    titleKey: 'why.feat2_title',
    descriptionKey: 'why.feat2_desc',
  },
  {
    id: 'premium-taste',
    icon: 'Award',
    titleKey: 'why.feat3_title',
    descriptionKey: 'why.feat3_desc',
  },
  {
    id: 'fast-delivery',
    icon: 'Truck',
    titleKey: 'why.feat4_title',
    descriptionKey: 'why.feat4_desc',
  },
  {
    id: 'affordable-prices',
    icon: 'Coins',
    titleKey: 'why.feat5_title',
    descriptionKey: 'why.feat5_desc',
  },
  {
    id: 'customer-satisfaction',
    icon: 'Smile',
    titleKey: 'why.feat6_title',
    descriptionKey: 'why.feat6_desc',
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-freshly-baked',
    questionKey: 'faq.q1',
    answerKey: 'faq.a1',
  },
  {
    id: 'faq-delivery',
    questionKey: 'faq.q2',
    answerKey: 'faq.a2',
  },
  {
    id: 'faq-shelf-life',
    questionKey: 'faq.q3',
    answerKey: 'faq.a3',
  },
  {
    id: 'faq-payment-methods',
    questionKey: 'faq.q4',
    answerKey: 'faq.a4',
  }
];
