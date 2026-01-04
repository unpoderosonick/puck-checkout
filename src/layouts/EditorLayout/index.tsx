import { Outlet, useNavigate } from 'react-router-dom';
import { PageTabs } from '../../components/editor/PageTabs';
import { usePagesStore } from '../../store/pagesStore';
import styles from './EditorLayout.module.css';

export const EditorLayout = (): JSX.Element => {
  const navigate = useNavigate();
  const { resetAllPages } = usePagesStore();

  const handleReset = () => {
    if (confirm('Reset all pages to default? This cannot be undone.')) {
      resetAllPages();
      window.location.reload();
    }
  };

  const handlePreviewFlow = () => {
    navigate('/preview');
  };

  return (
    <div className={styles.layout}>
      {/* Top Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Checkout Builder</h1>
        </div>

        <div className={styles.headerCenter}>
          <PageTabs />
        </div>

        <div className={styles.headerRight}>
          <button
            onClick={handlePreviewFlow}
            className={styles.previewButton}
          >
            Preview Flow
          </button>
          <button
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset All
          </button>
        </div>
      </header>

      {/* Editor Content */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default EditorLayout;
