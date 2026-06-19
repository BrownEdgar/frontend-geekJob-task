# The Artisan Kiln — Ceramic Tile Order Form

Interactive, fully-featured ceramic tile order form with a drag-and-drop design tool. Built with modern Next.js, Redux Toolkit, and Tailwind CSS.

## 🎯 Features

- **Responsive Design**: Mobile (vertical stack) and desktop (3-column layout with design tool)
- **Shopping Cart**: Add/remove tiles, edit quantities, live price calculations
- **Design Tool**: Desktop-only 7×7 grid with click-to-place and drag-and-drop support
- **Checkout Form**: Customer info, project notes, email validation, credit card processing
- **Payment Methods**: Credit Card, PayPal, Apple Pay, Bank Transfer
- **Smart Shipping**: Free over $500, otherwise flat $25 rate
- **Visual Design**: Sketch-style borders, custom ceramic-themed color palette, decorative elements

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Redux Toolkit** (modern selectors-in-slices pattern)
- **Tailwind CSS** (custom theme)
- **React Hook Form** + Zod (form validation)
- **Next.js Image** (optimized images)

## 📦 Project Structure

```bash
src/
├── app/
│   ├── store/                    # Redux store (modern structure)
│   │   ├── features/             # Slice definitions
│   │   │   ├── cart.ts          # Cart slice + selectors
│   │   │   ├── checkout.ts      # Checkout form state + actions
│   │   │   └── designGrid.ts    # Design grid state + selectors
│   │   ├── hooks.ts             # useAppDispatch, useAppSelector
│   │   ├── index.ts             # Store configuration
│   │   └── initialState.ts      # Initial cart items
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/
│   ├── cart/                     # Order table, summary
│   ├── checkout/                 # Customer form, payment, card fields
│   ├── design/                   # Design tool, grid, palette
│   ├── layout/                   # Header, footer, title
│   └── ui/                       # Reusable UI components
│
├── lib/
│   ├── pricing.ts               # Cost calculations
│   ├── validation.ts            # Form validation schemas
│   └── cn.ts                    # Class name utilities
│
├── data/
│   └── tiles.ts                 # Tile catalog with patterns
│
├── types/
│   └── index.ts                 # TypeScript types
│
└── providers/
    └── StoreProvider.tsx        # Redux wrapper

public/
├── tiles/                        # Tile pattern SVGs
├── decor/                        # Decorative leaf SVGs
├── add-button.png               # Cart action icon
├── shopping-basket.png          # Remove item icon
├── paypal.png                   # Payment method icon
└── cards.png                    # Credit card icon
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## 💡 Key Architecture Decisions

### Redux State Management

- **Modern Selector Pattern**: Selectors are defined inside slice files using `createSelector` from Redux Toolkit
- **Colocated Logic**: Each slice contains its reducers, actions, and selectors in one place
- **Type Safety**: Full TypeScript support with typed selectors and state

### Cart Logic

```typescript
// Selectors are exported from slices
export const selectCartItems = (state) => state.cart.items;
export const selectSubtotal = createSelector([selectCartItems], (items) =>
  calculateSubtotal(items)
);
```

### Component Structure

- **Page Component** (`src/app/page.tsx`): Orchestrates layout and responsive design
- **Feature Components**: Self-contained modules (cart, checkout, design tool)
- **UI Components**: Reusable building blocks with Tailwind + sketch styling

## 💰 Pricing Logic

```
Subtotal = sum of (quantity × unit price for each tile)
Shipping = $0 if subtotal > $500, else $25
Grand Total = subtotal + shipping
```

## 🎨 Design System

**Colors:**

- `cream`: #F5F0E6
- `ink`: #1A1A1A
- `navy`: #2C3E6B (buttons, call-to-action)
- `terracotta`: #C4654A (accents)
- `forest`: #3D5C3A
- `mustard`: #D4A843

**Sketch Style:** Custom borders using Tailwind's `sketch-border` class with 2px offset and subtle shadow

## ✅ Validation

**Customer Form:**

- Name: required, string
- Email: required, valid email format
- Phone: required, E.164 format
- Shipping Address: required, string
- Project Notes: optional, string

**Credit Card (when selected):**

- Card Number: 16 digits
- Expiration: MM/YY format
- CVV: 3 digits

Validation powered by Zod schemas in `lib/validation.ts`

## 📱 Responsive Breakpoints

- **Mobile**: < 1024px (vertical layout, simplified cart)
- **Desktop**: ≥ 1024px (3-column layout with design tool)

## 🔄 Workflow

1. **Add Tiles**: Browse tile collection, add to cart
2. **Adjust Quantities**: Use + button to increase, quantity input to edit
3. **Design (Desktop)**: Click palette tiles or drag them onto grid to visualize order
4. **Checkout**: Fill customer info and project notes, select payment method
5. **Validate & Submit**: Form validation prevents incomplete orders

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, then:
1. Connect repo in Vercel dashboard
2. Framework: Next.js (auto-detected)
3. Deploy
```

Environment variables (if needed): None required for this version

### Other Platforms

Build: `npm run build`
Start: `npm run start`
Port: 3000 (configurable via PORT env var)

## 📝 Notes

- Initial cart comes pre-populated with sample tiles
- Design grid is desktop-only for UX reasons
- All tile patterns are SVG for crisp scaling
- Form validation is client-side only; add server validation for production
- Payment processing is mocked (no real Stripe/PayPal integration)

## 👤 Credits

Built for **The Artisan Kiln** ceramic tile order system.

## 💬 Improvement Opportunities & Discussion Points

The following items are intentional conversation starters for design review, QA, and next iterations. Each pairs a **question** (what we observed) with a **proposal** (a concrete direction worth evaluating).

### 1. Project Notes field on mobile

**Question:** On mobile, the “Project Notes” control uses a different label treatment and sits far below the main checkout content—visually separated from the **Order Summary** and customer fields. Was this layout driven by viewport constraints, or is it an inconsistency between breakpoints?

**Proposal:** Treat Project Notes as part of the same checkout group as name, email, and order summary. Use one consistent label pattern (e.g. match other optional fields) and place the field directly under the primary form block on mobile so users do not have to hunt at the bottom of the page.

### 2. Payment method UI consistency

**Question:** The **PayPal** option and **Credit Card** option appear to follow different visual rules (spacing, borders, icon alignment, or selected/hover states). Should payment methods read as a single radio group with identical card chrome?

**Proposal:** Define one reusable payment-method tile component (shared padding, sketch border, focus ring, and active state) and map each method (Credit Card, PayPal, Apple Pay, Bank Transfer) through it so the checkout step feels cohesive and production-ready.

### 3. Primary navigation on small screens

**Question:** When the header does not scroll horizontally, several main-menu links may be off-screen or unreachable on narrower viewports. Is full navigation a requirement on mobile, or is a simplified nav acceptable?

**Proposal:** Add a responsive **burger menu** (icon button + slide-over or dropdown panel) that exposes all routes, preserves current page indication, and includes basic accessibility (`aria-expanded`, focus trap, Escape to close). This keeps the brand header clean while ensuring every section remains one tap away.

---
