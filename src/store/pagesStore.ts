import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Data } from '@measured/puck';
import type { PageType, PagesStore } from '../types/pages';
import { defaultCheckoutData } from '../puck/defaults/checkoutDefault';
import { defaultOrderBumpData } from '../puck/defaults/orderBumpDefault';
import { defaultDownsellData } from '../puck/defaults/downsellDefault';

// Get default data for all pages
const getDefaultPages = (): Record<PageType, Data> => ({
  checkout: defaultCheckoutData,
  'order-bump': defaultOrderBumpData,
  downsell: defaultDownsellData,
});

// Track unsaved changes per page
const unsavedChanges: Record<PageType, boolean> = {
  checkout: false,
  'order-bump': false,
  downsell: false,
};

export const usePagesStore = create<PagesStore>()(
  persist(
    (set, get) => ({
      // Initial state
      pages: getDefaultPages(),
      activePage: 'checkout',

      // Get data for a specific page
      getPageData: (pageType: PageType): Data => {
        const pages = get().pages;
        // Return default if page doesn't exist
        if (!pages[pageType]) {
          const defaults = getDefaultPages();
          return defaults[pageType];
        }
        return pages[pageType];
      },

      // Set data for a specific page
      setPageData: (pageType: PageType, data: Data): void => {
        set((state) => ({
          pages: {
            ...state.pages,
            [pageType]: data,
          },
        }));
        unsavedChanges[pageType] = false;
      },

      // Set active page for editing
      setActivePage: (pageType: PageType): void => {
        set({ activePage: pageType });
      },

      // Reset a single page to defaults
      resetPage: (pageType: PageType): void => {
        const defaults = getDefaultPages();
        set((state) => ({
          pages: {
            ...state.pages,
            [pageType]: defaults[pageType],
          },
        }));
        unsavedChanges[pageType] = false;
      },

      // Reset all pages to defaults
      resetAllPages: (): void => {
        set({ pages: getDefaultPages() });
        Object.keys(unsavedChanges).forEach((key) => {
          unsavedChanges[key as PageType] = false;
        });
      },

      // Check if page has unsaved changes
      hasUnsavedChanges: (pageType: PageType): boolean => {
        return unsavedChanges[pageType];
      },
    }),
    {
      name: 'checkout-builder-pages',
      partialize: (state) => ({
        pages: state.pages,
        activePage: state.activePage,
      }),
      // Merge persisted state with defaults to handle missing pages
      merge: (persistedState, currentState) => {
        const defaults = getDefaultPages();
        const persisted = persistedState as Partial<PagesStore> | undefined;

        // Ensure all pages exist, using defaults for missing ones
        const mergedPages: Record<PageType, Data> = {
          checkout: persisted?.pages?.checkout || defaults.checkout,
          'order-bump': persisted?.pages?.['order-bump'] || defaults['order-bump'],
          downsell: persisted?.pages?.downsell || defaults.downsell,
        };

        return {
          ...currentState,
          pages: mergedPages,
          activePage: persisted?.activePage || 'checkout',
        };
      },
    }
  )
);

// Helper to mark page as having unsaved changes
export const markPageAsChanged = (pageType: PageType): void => {
  unsavedChanges[pageType] = true;
};

// Helper to get all unsaved pages
export const getUnsavedPages = (): PageType[] => {
  return Object.entries(unsavedChanges)
    .filter(([, hasChanges]) => hasChanges)
    .map(([pageType]) => pageType as PageType);
};
