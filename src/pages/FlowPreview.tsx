import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Render } from '@measured/puck';
import { config } from '../puck/config';
import { usePagesStore } from '../store/pagesStore';
import { FlowStepper } from '../components/editor/FlowStepper';
import { FLOW_ORDER, type PageType } from '../types/pages';
import styles from './FlowPreview.module.css';

export const FlowPreview = (): JSX.Element => {
  const navigate = useNavigate();
  const { getPageData } = usePagesStore();
  const [currentStep, setCurrentStep] = useState<PageType>('checkout');

  const currentIndex = FLOW_ORDER.indexOf(currentStep);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < FLOW_ORDER.length - 1;

  const pageData = getPageData(currentStep);

  const handleStepClick = useCallback((step: PageType) => {
    setCurrentStep(step);
  }, []);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setCurrentStep(FLOW_ORDER[currentIndex + 1]);
    }
  }, [hasNext, currentIndex]);

  const handlePrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentStep(FLOW_ORDER[currentIndex - 1]);
    }
  }, [hasPrevious, currentIndex]);

  const handleBackToEditor = () => {
    navigate('/editor/checkout');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button onClick={handleBackToEditor} className={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Editor
        </button>
        <h1 className={styles.title}>Flow Preview</h1>
        <div className={styles.placeholder} />
      </header>

      {/* Flow Stepper */}
      <FlowStepper currentStep={currentStep} onStepClick={handleStepClick} />

      {/* Preview Area */}
      <div className={styles.previewArea}>
        <div className={styles.previewContent}>
          <Render config={config} data={pageData} />
        </div>
      </div>

      {/* Navigation Footer */}
      <footer className={styles.footer}>
        <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className={styles.navButton}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Previous
        </button>

        <span className={styles.stepIndicator}>
          Step {currentIndex + 1} of {FLOW_ORDER.length}
        </span>

        <button
          onClick={handleNext}
          disabled={!hasNext}
          className={styles.navButton}
        >
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default FlowPreview;
