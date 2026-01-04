import type { Data } from '@measured/puck';

// Page types supported in the checkout builder
export type PageType = 'checkout' | 'order-bump' | 'downsell';

// Page configuration with metadata
export interface PageConfig {
  id: PageType;
  label: string;
  description: string;
  icon: string;
  order: number;
}

// Page definitions with labels and order
export const PAGE_CONFIGS: Record<PageType, PageConfig> = {
  checkout: {
    id: 'checkout',
    label: 'Checkout',
    description: 'Main checkout page with form and order summary',
    icon: '1',
    order: 1,
  },
  'order-bump': {
    id: 'order-bump',
    label: 'Order Bump',
    description: 'Additional offer shown before payment',
    icon: '2',
    order: 2,
  },
  downsell: {
    id: 'downsell',
    label: 'Downsell',
    description: 'Alternative offer if customer declines upsell',
    icon: '3',
    order: 3,
  },
};

// Flow order for navigation
export const FLOW_ORDER: PageType[] = ['checkout', 'order-bump', 'downsell'];

// State structure for pages store
export interface PagesState {
  pages: Record<PageType, Data>;
  activePage: PageType;
}

// Store actions interface
export interface PagesActions {
  getPageData: (pageType: PageType) => Data;
  setPageData: (pageType: PageType, data: Data) => void;
  setActivePage: (pageType: PageType) => void;
  resetPage: (pageType: PageType) => void;
  resetAllPages: () => void;
  hasUnsavedChanges: (pageType: PageType) => boolean;
}

// Combined store type
export type PagesStore = PagesState & PagesActions;
