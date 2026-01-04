import { useCallback, useRef } from 'react';
import { Puck } from '@measured/puck';
import type { Data } from '@measured/puck';
import { config } from '../puck/config';
import { usePagesStore, markPageAsChanged } from '../store/pagesStore';
import { PAGE_CONFIGS, type PageType } from '../types/pages';

interface PageEditorProps {
  pageType: PageType;
}

export const PageEditor = ({ pageType }: PageEditorProps): JSX.Element => {
  const pages = usePagesStore((state) => state.pages);
  const setPageData = usePagesStore((state) => state.setPageData);

  // Get data directly from store for this page type
  const pageData = pages[pageType];
  const latestDataRef = useRef<Data>(pageData);

  const handlePublish = useCallback(
    (publishData: Data) => {
      setPageData(pageType, publishData);
      latestDataRef.current = publishData;
      console.log(`Published ${pageType}:`, publishData);
    },
    [pageType, setPageData]
  );

  const handleChange = useCallback(
    (newData: Data) => {
      latestDataRef.current = newData;
      markPageAsChanged(pageType);
    },
    [pageType]
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
        overrides={{
          headerActions: () => <></>,
        }}
      />
    </div>
  );
};

export default PageEditor;
