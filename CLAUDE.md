# Checkout Builder - Puck Editor

## Overview

A visual drag-and-drop checkout page builder built with [Puck Editor](https://puckeditor.com/) and React. This application allows merchants to create customized checkout experiences similar to Shopify's checkout editor.

## Architecture

```
src/
├── App.tsx                 # Main app with Puck editor and preview toggle
├── main.tsx               # Entry point
├── puck/
│   ├── config.tsx         # Puck configuration with all components
│   └── defaultCheckout.ts # Default checkout layout data
├── components/
│   ├── layout/            # Container and structure components
│   │   ├── CheckoutContainer/  # Two-column layout with DropZones
│   │   ├── Section/           # Collapsible section with DropZone
│   │   ├── FormRow/           # Multi-column form row with DropZone
│   │   └── Divider/           # Visual separator
│   ├── form/              # Form input components
│   │   ├── TextField/
│   │   ├── EmailField/
│   │   ├── PhoneField/
│   │   ├── SelectField/
│   │   ├── AddressField/
│   │   └── CheckboxField/
│   ├── checkout/          # Checkout-specific components
│   │   ├── ProductCard/
│   │   ├── OrderSummary/
│   │   ├── ShippingSelector/
│   │   ├── PaymentSelector/
│   │   ├── DiscountInput/
│   │   └── TipSelector/
│   ├── upsell/            # Upsell and offer components
│   │   ├── UpsellCard/
│   │   ├── PostPurchaseOffer/
│   │   ├── DownsellModal/
│   │   ├── OrderBump/
│   │   └── BundleBuilder/
│   └── branding/          # Header, footer, and branding
│       ├── Header/
│       ├── SubmitButton/
│       ├── TrustBadges/
│       └── FooterLinks/
├── hooks/
│   ├── useTimer.ts        # Countdown timer hook
│   ├── useCart.ts         # Cart state hook
│   └── useUpsellFlow.ts   # Upsell flow management
├── store/
│   └── checkoutStore.ts   # Zustand store for checkout state
└── theme/
    └── variables.css      # CSS custom properties (design tokens)
```

## How It Works

### Puck Editor Integration

The app uses Puck as the visual editor engine. Key concepts:

1. **Config** (`src/puck/config.tsx`): Defines all available components and their editable fields
2. **Components**: Each component exports:
   - The React component itself
   - A `ComponentConfig` object that defines Puck fields and default props
3. **DropZones**: Components like `CheckoutContainer` and `Section` contain `<DropZone>` components that allow nesting other components

### Component Pattern

Each component follows this structure:

```typescript
// Component definition
export const MyComponent = (props: MyComponentProps): JSX.Element => {
  return <div>...</div>;
};

// Puck configuration
export const myComponentConfig: ComponentConfig<MyComponentProps> = {
  label: 'My Component',
  fields: {
    // Editable fields shown in Puck's sidebar
    fieldName: { type: 'text', label: 'Field Label' },
  },
  defaultProps: {
    fieldName: 'default value',
  },
  render: MyComponent,
};
```

### DropZones (Nested Components)

Components that accept child components use Puck's `DropZone`:

```typescript
import { DropZone } from '@measured/puck';

export const Container = () => (
  <div>
    <DropZone zone="content" />
  </div>
);
```

The zone name creates a unique path like `component-id:content` in Puck's data structure.

### State Management

- **Puck manages its own internal state** for the editor
- **localStorage** saves the checkout configuration when published
- **Zustand store** (`checkoutStore.ts`) manages runtime checkout state (cart, form data, etc.)

## Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Editor Controls

- **Reset button** (red): Clears localStorage and reloads with default layout
- **Preview/Edit button** (blue/green): Toggles between editor and preview mode
- **Publish button** (in Puck header): Saves configuration to localStorage

## Key Technical Decisions

1. **CSS Modules**: Scoped styles prevent conflicts between components
2. **No React.FC**: Components use explicit `(): JSX.Element` return types for Puck compatibility
3. **CSS Variables**: Design tokens in `variables.css` enable theming
4. **Simplified DropZones**: Removed `position: sticky` and `overflow` from containers to fix drag-and-drop issues

## Common Issues

### Drag and drop not working
- Ensure containers don't have `overflow: hidden/auto` or `position: sticky`
- DropZones need `position: relative` and proper `z-index`

### TypeScript errors with Puck
- Components must return `JSX.Element`, not `ReactNode`
- Use `(props: Props): JSX.Element =>` instead of `React.FC<Props>`

### HMR warnings about "incompatible exports"
- Normal when exporting both component and config from same file
- Page will full-reload instead of hot-reload

## Component Categories

| Category | Components | Purpose |
|----------|------------|---------|
| Layout | CheckoutContainer, Section, FormRow, Divider | Page structure and containers |
| Form | TextField, EmailField, PhoneField, SelectField, AddressField, CheckboxField | User input fields |
| Checkout | ProductCard, OrderSummary, ShippingSelector, PaymentSelector, DiscountInput, TipSelector | Checkout flow elements |
| Upsell | UpsellCard, PostPurchaseOffer, DownsellModal, OrderBump, BundleBuilder | Conversion optimization |
| Branding | Header, SubmitButton, TrustBadges, FooterLinks | Visual branding elements |

## Future Enhancements

- Integration with Shopify Storefront API
- Multi-step checkout flow
- A/B testing support
- Analytics integration
- Custom field validation
