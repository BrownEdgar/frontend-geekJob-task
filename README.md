# The Artisan Kiln — Ceramic Tile Order Form

Interactive single-page order form for ceramic tiles. Built as a test assignment for **The Artisan Kiln**.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom theme in `tailwind.config.js`)
- **Redux Toolkit** (cart, design grid, checkout state)

## Features

- Responsive layout: mobile (vertical form) and desktop (3-column with design tool)
- Shopping cart with quantity editing, add/remove items, live totals
- Shipping logic: free over $500, otherwise $25
- Desktop-only 7×7 design grid with palette (click-to-place + drag-and-drop)
- Checkout validation (customer info, email, credit card fields)
- Payment method switching (Credit Card, PayPal, Apple Pay, Bank Transfer)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # production build
npm run start   # run production server
npm run lint    # ESLint
```

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # UI, cart, checkout, design tool, layout
  data/             # Tile catalog
  lib/              # Pricing & validation helpers
  store/            # Redux slices & selectors
  types/            # Shared TypeScript types
public/
  tiles/            # Tile pattern SVGs
  decor/            # Decorative assets
design/             # Reference mockups (mobile & desktop)
```

## Design References

- Mobile: `design/design_mobile.png`
- Desktop: `design/design_desktop.png`

## Deploy

The app is ready for [Vercel](https://vercel.com):

1. Push the repository to GitHub/GitLab
2. Import the project in Vercel
3. Deploy (framework preset: Next.js)

---

## Original Assignment (ТЗ)

See the technical requirements in the assignment brief: pixel-perfect responsive layout, Redux state for cart and design grid, initial tile data (Ocean Wave, Forest Fern, Terracotta Dot, Yellow Star), and checkout form validation.

**Business logic:**

- `Subtotal` = sum of (quantity × unit price)
- `Shipping` = $0 if subtotal > $500, else $25
- `Grand Total` = subtotal + shipping
