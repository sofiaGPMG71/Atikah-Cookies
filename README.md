# SofiaAtikah Cookies 🍪 (by SofiaGPMG)

Welcome to the premium, luxury Single Page Application (SPA) designed for **SofiaAtikah Cookies**. This website delivers a high-converting, responsive, elegant, and interactive visual storefront to encourage gourmet cookie sales.

---

## 🎨 Visual Identity & Style

The website utilizes an custom bakery visual framework centering on warmth, luxury, and artisan craftsmanship:
- **Color Palette**: Rich Chocolate Browns, Warm Creams, soft golden highlights, and delicate orange tones.
- **Typography**: Paired Google Fonts: **Playfair Display** (luxurious editorial titles) and **Poppins** / **Nunito** (clean, highly readable modern UI/sans-serif text).
- **Micro-interactions**: Smooth 60 FPS transitions, springy expand/collapse FAQ accordions, hover lifts, image zoom focus triggers, sliding review carousels, and tactile floating toast notifications built using standard `@tailwindcss/vite` and `motion/react`.

---

## 📁 Professional Project Structure

The codebase is organized following modern industry modular standards:

```text
/
├── .env.example            # Template for environment configurations
├── index.html              # HTML5 template entry point
├── metadata.json           # Application metadata, frame permissions, and capabilities
├── package.json            # NPM dependencies and script hooks
├── tsconfig.json           # Strict TypeScript compilation rules
├── vite.config.ts          # Vite configuration with tailwindcss setup
└── src/
    ├── main.tsx            # App bootstrap entry point
    ├── App.tsx             # Main layout sticher wrapping sections
    ├── index.css           # Global custom theme styles & Google Fonts loaded via Tailwind v4
    ├── types.ts            # Centralized TypeScript interfaces for Products, Cart, FAQs
    ├── translations.ts     # Fully-structured English ('en') & Bahasa Melayu ('ms') dictionary
    ├── products.ts         # Gourmet cookie collection database
    ├── data.ts             # Modular static content (Testimonials, WhyChooseUs, FAQs)
    ├── context/
    │   └── AppContext.tsx  # Global state manager (Bilingual translator, Shopping Cart, Toasts)
    └── components/
        ├── Navbar.tsx      # Sticky frosted-glass nav, mobile drawer, and language selector
        ├── Hero.tsx        # High-impact bakery banner, premium badges, CTA, and floating particles
        ├── About.tsx       # Narrative block, animated quality checklist, and stats counter
        ├── Products.tsx    # Interactive catalog filter (All, Signature, Classics, Crunchy)
        ├── WhyChooseUs.tsx # Luxury benefit cards with viewport hover rotate triggers
        ├── Testimonials.tsx# Automatic customer reviews carousel with manual arrows
        ├── FAQ.tsx         # Expandable question accordions with spring motion
        ├── Contact.tsx     # Secure form validator, social links, and vector locator map card
        ├── Footer.tsx      # High-density links matrix and Scroll-to-Top trigger button
        ├── CartSidebar.tsx # Right-sliding shopping basket with dynamic subtotal & free delivery calculation
        └── ToastContainer.tsx# Stacked floating notification overlay alerts
```

---

## 🚀 How to Run the Website

### Development Mode
To boot the application locally on port `3000`:
1. Ensure all packages are installed:
   ```bash
   npm install
   ```
2. Run the local dev server:
   ```bash
   npm run dev
   ```

### Production Build
To bundle the application for production deployment (producing optimized, static files inside the `dist/` folder):
```bash
npm run build
```

---

## 🌐 Dynamic Translation System

The translation system is designed to be **scalable**, **type-safe**, and **easy to maintain**. All localized text is organized inside `/src/translations.ts`.

### How it Works:
1. **State Persistence**: The user's selected language (`en` or `ms`) is saved to `localStorage` via `AppContext.tsx`. It instantly persists when the page is refreshed or revisited.
2. **Translation Key Mapping**: Elements in the HTML use a custom translation helper `t('key')` which replaces hardcoded strings with localized variables.
3. **Dynamic Value Interpolation**: The translation helper supports placing variables dynamically into strings. For example:
   - Dictionary: `"toast.addedToCart": "Successfully added {name} to your cart!"`
   - Execution: `t('toast.addedToCart', { name: 'Double Chocolate' })`
4. **Graceful Fallback**: If a key is missing in the chosen language (e.g. Bahasa Melayu), the translation helper automatically displays the **English** version of that key to prevent visual breaks.

---

## 🛠️ Content Customization Guide

### 1. How to Add or Edit Products
To modify or append items to our cookie list, open `/src/products.ts` and add a new item matching the `Product` interface:

```typescript
// /src/products.ts
{
  id: 'golden-hazelnut',
  nameKey: 'cookie.hazelnut.name',          // Key pointing totranslations.ts
  descriptionKey: 'cookie.hazelnut.desc',    // Key pointing to translations.ts
  price: 19.90,                              // Numeric price in RM
  rating: 4.9,                               // Customer rating score
  reviewsCount: 35,                          // Total reviewers count
  image: 'https://images.unsplash.com/...',   // High-res product thumbnail
  category: 'crunchy',                       // Filter category: signature, classic, crunchy
  tags: ['new'],                             // Optional tags: bestseller, new
}
```
*Don't forget to define the new translation keys in `/src/translations.ts` under both `en` and `ms`!*

### 2. How to Add a New Section
1. Create a new component inside `/src/components/YourSection.tsx`.
2. Add your section's translatable labels inside `/src/translations.ts`.
3. In `/src/components/Navbar.tsx` and `/src/components/Footer.tsx`, add the new link id to the links list so that the header and mobile drawers can automatically smooth-scroll to it and highlight it when active.
4. Import and mount your section inside `/src/App.tsx`.

### 3. How to Add a New Language (e.g., Chinese `zh`)
1. Open `/src/types.ts` and update the `Language` type:
   ```typescript
   export type Language = 'en' | 'ms' | 'zh';
   ```
2. Open `/src/translations.ts` and append a new locale dictionary:
   ```typescript
   export const translations = {
     en: { ... },
     ms: { ... },
     zh: {
       "nav.home": "首页",
       "nav.about": "关于我们",
       // Add all keys...
     }
   }
   ```
3. Open `/src/components/Navbar.tsx` and append a selector button for the new language inside the language dropdown drawer:
   ```tsx
   <button onClick={() => selectLanguage('zh')}>中文</button>
   ```

---

## ♿ Accessibility & Performance Standards
- **ARIA & Keyboard Support**: Standard elements have explicit roles, hamburger triggers utilize `aria-label`, and interactive panels support keyboard focus.
- **Image Optimization**: All stock photography utilizes optimized Unsplash queries with custom width caps and lazy-loading attributes (`referrerPolicy="no-referrer"` is enforced on every tag to ensure sandboxed cross-domain reliability).
- **No Heavy Libraries**: Pure lightweight CSS styling and custom state management means the app weighs almost nothing, guaranteeing blazing fast, near-instant load speeds.
