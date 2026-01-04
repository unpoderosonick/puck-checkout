import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_CONFIGS, FLOW_ORDER, type PageType } from '../../../types/pages';
import styles from './PageTabs.module.css';

export const PageTabs = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active page from URL
  const getActivePageFromPath = (): PageType => {
    const path = location.pathname;
    if (path.includes('order-bump')) return 'order-bump';
    if (path.includes('downsell')) return 'downsell';
    return 'checkout';
  };

  const activePage = getActivePageFromPath();

  const handleTabClick = (pageType: PageType) => {
    navigate(`/editor/${pageType}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {FLOW_ORDER.map((pageType, index) => {
          const config = PAGE_CONFIGS[pageType];
          const isActive = pageType === activePage;
          const isLast = index === FLOW_ORDER.length - 1;

          return (
            <div key={pageType} className={styles.tabWrapper}>
              <button
                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                onClick={() => handleTabClick(pageType)}
              >
                <span className={styles.tabNumber}>{config.order}</span>
                <span className={styles.tabLabel}>{config.label}</span>
              </button>
              {!isLast && (
                <div className={styles.arrow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageTabs;
