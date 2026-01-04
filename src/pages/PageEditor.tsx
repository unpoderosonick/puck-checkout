import { useCallback, useRef } from 'react';
import { Puck } from '@measured/puck';
import type { Data } from '@measured/puck';
import headingAnalyzer from '@measured/puck-plugin-heading-analyzer';
import '@measured/puck-plugin-heading-analyzer/dist/index.css';
import { config } from '../puck/config';
import { usePagesStore } from '../store/pagesStore';
import { PAGE_CONFIGS, type PageType } from '../types/pages';

interface PageEditorProps {
  pageType: PageType;
}

export const PageEditor = ({ pageType }: PageEditorProps): JSX.Element => {
  // Only get setPageData - we'll get initial data once via getState()
  const setPageData = usePagesStore((state) => state.setPageData);

  // Get initial data only once per pageType using ref
  const initialDataRef = useRef<{ pageType: PageType; data: Data } | null>(null);

  // Only read from store if pageType changed
  if (!initialDataRef.current || initialDataRef.current.pageType !== pageType) {
    const pages = usePagesStore.getState().pages;
    initialDataRef.current = { pageType, data: pages[pageType] };
  }

  const pageData = initialDataRef.current.data;

  const handlePublish = useCallback(
    (publishData: Data) => {
      console.log(`[PageEditor] handlePublish for: ${pageType}`);
      setPageData(pageType, publishData);
      // Update ref so next mount uses latest data
      if (initialDataRef.current) {
        initialDataRef.current.data = publishData;
      }
    },
    [pageType, setPageData]
  );

  // Debounce timer ref
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (newData: Data) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      // Set new debounced save
      debounceTimerRef.current = setTimeout(() => {
        console.log(`[PageEditor] Debounced save for ${pageType}`);
        setPageData(pageType, newData);
        // Update ref
        if (initialDataRef.current) {
          initialDataRef.current.data = newData;
        }
      }, 500);
    },
    [pageType, setPageData]
  );

  const pageTitle = PAGE_CONFIGS[pageType].label + ' Builder';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Puck
        key={pageType}
        config={config}
        data={pageData}
        onChange={handleChange}
        onPublish={handlePublish}
        headerTitle={pageTitle}
        plugins={[headingAnalyzer]}
        ui={{
          leftSideBarVisible: true,
          rightSideBarVisible: true,
        }}
        viewports={[
          { width: 375, height: 'auto', label: 'Mobile', icon: 'Smartphone' },
          { width: 768, height: 'auto', label: 'Tablet', icon: 'Tablet' },
          { width: 1280, height: 'auto', label: 'Desktop', icon: 'Monitor' },
        ]}
      />
    </div>
  );
};

export default PageEditor;
