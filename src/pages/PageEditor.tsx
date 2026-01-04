import { useCallback } from 'react';
import { Puck } from '@measured/puck';
import type { Data } from '@measured/puck';
import { config } from '../puck/config';
import { usePagesStore } from '../store/pagesStore';
import { PAGE_CONFIGS, type PageType } from '../types/pages';

interface PageEditorProps {
  pageType: PageType;
}

export const PageEditor = ({ pageType }: PageEditorProps): JSX.Element => {
  const pages = usePagesStore((state) => state.pages);
  const setPageData = usePagesStore((state) => state.setPageData);

  // Get data directly from store for this page type
  const pageData = pages[pageType];

  console.log(`[PageEditor] Rendering page: ${pageType}`);
  console.log(`[PageEditor] pageData.content length:`, pageData?.content?.length);
  console.log(`[PageEditor] pageData.zones keys:`, Object.keys(pageData?.zones || {}));

  const handlePublish = useCallback(
    (publishData: Data) => {
      console.log(`[PageEditor] handlePublish for: ${pageType}`);
      setPageData(pageType, publishData);
    },
    [pageType, setPageData]
  );

  // Save on every change to ensure data persists
  const handleChange = useCallback(
    (newData: Data) => {
      console.log(`[PageEditor] handleChange for ${pageType}, saving to store...`);
      setPageData(pageType, newData);
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
        overrides={{
          headerActions: () => <></>,
        }}
      />
    </div>
  );
};

export default PageEditor;
