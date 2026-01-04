import type { Data } from '@measured/puck';
import { usePagesStore } from '../store/pagesStore';

const LEGACY_KEY = 'checkout-config';
const NEW_KEY = 'checkout-builder-pages';

/**
 * Migrates legacy single-page checkout config to new multi-page format.
 * This ensures backwards compatibility with existing saved data.
 */
export const migrateLegacyData = (): boolean => {
  // Check if new format already exists
  const newData = localStorage.getItem(NEW_KEY);
  if (newData) {
    console.log('[Migration] New format already exists, skipping migration');
    return false;
  }

  // Check for legacy data
  const legacyData = localStorage.getItem(LEGACY_KEY);
  if (!legacyData) {
    console.log('[Migration] No legacy data found');
    return false;
  }

  try {
    const parsedLegacy: Data = JSON.parse(legacyData);

    // Validate it's a valid Puck Data structure
    if (!parsedLegacy.content || !parsedLegacy.zones) {
      console.error('[Migration] Invalid legacy data structure');
      return false;
    }

    // Use the store to set the checkout page data
    const { setPageData } = usePagesStore.getState();
    setPageData('checkout', parsedLegacy);

    console.log('[Migration] Successfully migrated legacy checkout config');

    // Optional: Remove legacy data after successful migration
    // Uncomment the line below to clean up after migration
    // localStorage.removeItem(LEGACY_KEY);

    return true;
  } catch (error) {
    console.error('[Migration] Failed to migrate legacy data:', error);
    return false;
  }
};

/**
 * Checks if legacy data exists that needs migration
 */
export const hasLegacyData = (): boolean => {
  const newData = localStorage.getItem(NEW_KEY);
  const legacyData = localStorage.getItem(LEGACY_KEY);
  return !newData && !!legacyData;
};

/**
 * Clears all page data (both legacy and new format)
 */
export const clearAllData = (): void => {
  localStorage.removeItem(LEGACY_KEY);
  localStorage.removeItem(NEW_KEY);
};
