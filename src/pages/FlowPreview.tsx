import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Render } from '@measured/puck';
import { config } from '../puck/config';
import { usePagesStore } from '../store/pagesStore';
import { FLOW_ORDER, type PageType } from '../types/pages';
import styles from './FlowPreview.module.css';

export const FlowPreview = (): JSX.Element => {
  const navigate = useNavigate();
  const { getPageData } = usePagesStore();
  const [currentStep, setCurrentStep] = useState<PageType>('checkout');
  const previewRef = useRef<HTMLDivElement>(null);

  const currentIndex = FLOW_ORDER.indexOf(currentStep);
  const hasNext = currentIndex < FLOW_ORDER.length - 1;

  const pageData = getPageData(currentStep);

  const handleBackToEditor = () => {
    navigate('/editor/checkout');
  };

  // Navigate to next step in the flow
  const goToNextStep = useCallback(() => {
    if (hasNext) {
      setCurrentStep(FLOW_ORDER[currentIndex + 1]);
    }
  }, [hasNext, currentIndex]);

  // Navigate to a specific step
  const goToStep = useCallback((step: PageType) => {
    setCurrentStep(step);
  }, []);

  // Handle click events on the preview content
  useEffect(() => {
    const container = previewRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Find the closest button or clickable element
      const button = target.closest('button');
      const link = target.closest('a');

      if (!button && !link) return;

      const element = button || link;
      if (!element) return;

      // Get button text to determine action
      const buttonText = element.textContent?.toLowerCase() || '';

      // Prevent default navigation
      e.preventDefault();
      e.stopPropagation();

      console.log('[FlowPreview] Button clicked:', buttonText, 'Current step:', currentStep);

      // Navigation logic based on current page and button type
      if (currentStep === 'checkout') {
        // On checkout: "Pay now", "Complete order", "Submit", etc. → Order Bump
        if (
          buttonText.includes('pay') ||
          buttonText.includes('complete') ||
          buttonText.includes('submit') ||
          buttonText.includes('place order') ||
          buttonText.includes('continue')
        ) {
          console.log('[FlowPreview] Navigating to order-bump');
          goToStep('order-bump');
        }
      } else if (currentStep === 'order-bump') {
        // On order bump: "No thanks", "Skip", "Decline" → Downsell
        // "Yes", "Add", "Accept" → Could stay or complete (for now, stay)
        if (
          buttonText.includes('no thanks') ||
          buttonText.includes('no,') ||
          buttonText.includes('skip') ||
          buttonText.includes('decline') ||
          buttonText.includes('continue without')
        ) {
          console.log('[FlowPreview] Navigating to downsell');
          goToStep('downsell');
        } else if (
          buttonText.includes('yes') ||
          buttonText.includes('add') ||
          buttonText.includes('accept') ||
          buttonText.includes('i want')
        ) {
          // Accept the upsell, then go to downsell or complete
          console.log('[FlowPreview] Upsell accepted, navigating to downsell');
          goToStep('downsell');
        }
      } else if (currentStep === 'downsell') {
        // On downsell: Any action goes back to start or completes
        if (
          buttonText.includes('yes') ||
          buttonText.includes('accept') ||
          buttonText.includes('add') ||
          buttonText.includes('i want') ||
          buttonText.includes('no') ||
          buttonText.includes('skip') ||
          buttonText.includes('complete')
        ) {
          console.log('[FlowPreview] Flow complete, returning to checkout');
          // Reset to checkout to restart the flow
          goToStep('checkout');
        }
      }
    };

    container.addEventListener('click', handleClick, true);

    return () => {
      container.removeEventListener('click', handleClick, true);
    };
  }, [currentStep, goToNextStep, goToStep]);

  return (
    <div className={styles.fullScreenContainer}>
      {/* Floating Exit Button */}
      <button
        onClick={handleBackToEditor}
        className={styles.exitButton}
        title="Exit Preview"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Exit Preview</span>
      </button>

      {/* Full Screen Preview */}
      <div className={styles.previewContent} ref={previewRef}>
        <Render config={config} data={pageData} />
      </div>
    </div>
  );
};

export default FlowPreview;
