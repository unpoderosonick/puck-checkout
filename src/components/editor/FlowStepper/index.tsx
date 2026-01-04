import { PAGE_CONFIGS, FLOW_ORDER, type PageType } from '../../../types/pages';
import styles from './FlowStepper.module.css';

interface FlowStepperProps {
  currentStep: PageType;
  onStepClick?: (step: PageType) => void;
}

export const FlowStepper = ({ currentStep, onStepClick }: FlowStepperProps): JSX.Element => {
  const currentIndex = FLOW_ORDER.indexOf(currentStep);

  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
        {FLOW_ORDER.map((pageType, index) => {
          const config = PAGE_CONFIGS[pageType];
          const isActive = pageType === currentStep;
          const isCompleted = index < currentIndex;
          const isLast = index === FLOW_ORDER.length - 1;

          return (
            <div key={pageType} className={styles.stepWrapper}>
              <button
                className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                onClick={() => onStepClick?.(pageType)}
                disabled={!onStepClick}
              >
                <span className={styles.stepNumber}>
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    config.order
                  )}
                </span>
                <span className={styles.stepLabel}>{config.label}</span>
              </button>
              {!isLast && (
                <div className={`${styles.connector} ${isCompleted ? styles.connectorCompleted : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowStepper;
