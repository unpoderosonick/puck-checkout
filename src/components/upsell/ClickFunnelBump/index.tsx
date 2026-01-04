import type { ComponentConfig } from '@measured/puck';
import styles from './ClickFunnelBump.module.css';

export interface ClickFunnelBumpProps {
  checkboxLabel: string;
  offerTitle: string;
  offerDescription: string;
  borderColor: string;
  backgroundColor: string;
  checkboxHighlightColor: string;
  showArrow: boolean;
}

export const ClickFunnelBump = ({
  checkboxLabel,
  offerTitle,
  offerDescription,
  borderColor,
  backgroundColor,
  checkboxHighlightColor,
  showArrow,
}: ClickFunnelBumpProps): JSX.Element => {

  return (
    <div
      className={styles.container}
      style={
        {
          '--cfb-border-color': borderColor,
          '--cfb-background-color': backgroundColor,
          '--cfb-highlight-color': checkboxHighlightColor,
        } as React.CSSProperties
      }
    >
      <label className={styles.checkboxArea}>
        {showArrow && (
          <svg
            className={styles.arrow}
            viewBox="0 0 512 512"
            aria-hidden="true"
          >
            <path
              d="M48 256c0-11.5 4.8-22 13.3-29.7l4.7-4.3c8.7-8 20-12 31.6-12h212.4v-96c0-17.7 14.3-32 32-32 8.4 0 16.5 3.3 22.5 9.3l128 128c12.4 12.4 12.4 32.6 0 45l-128 128c-6 6-14.1 9.3-22.5 9.3-17.7 0-32-14.3-32-32v-96H97.6c-11.6 0-22.9-4-31.6-12l-4.7-4.3C52.8 278 48 267.5 48 256z"
              fill="#f44336"
            />
          </svg>
        )}
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" className={styles.input} />
          <span className={styles.checkmark} />
        </div>
        <span className={styles.checkboxLabel}>{checkboxLabel}</span>
      </label>

      <p className={styles.content}>
        <span className={styles.offerTitle}>{offerTitle}</span>
        {': '}
        <span className={styles.offerDescription}>{offerDescription}</span>
      </p>
    </div>
  );
};

export const clickFunnelBumpConfig: ComponentConfig<ClickFunnelBumpProps> = {
  label: 'ClickFunnel Bump',
  fields: {
    checkboxLabel: {
      type: 'text',
      label: 'Checkbox Label',
    },
    offerTitle: {
      type: 'text',
      label: 'Offer Title',
    },
    offerDescription: {
      type: 'textarea',
      label: 'Offer Description',
    },
    borderColor: {
      type: 'text',
      label: 'Border Color (hex)',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color (hex)',
    },
    checkboxHighlightColor: {
      type: 'text',
      label: 'Checkbox Highlight Color (hex)',
    },
    showArrow: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Show Decorative Arrow',
    },
  },
  defaultProps: {
    checkboxLabel: 'Yes, I will Take It!',
    offerTitle: 'ONE TIME OFFER',
    offerDescription:
      'Lorem ipsum dolor sit amet, im nights consectetur adipisicing elit. Aut, quod hic expedita consectetur vitae nulla sint adipisci cupiditate at. Commodi, dolore hic eaque tempora a repudiandae obcaecati deleniti mollitia possimus.',
    borderColor: '#8B4513',
    backgroundColor: '#FDF5E6',
    checkboxHighlightColor: '#FFEB3B',
    showArrow: true,
  },
  render: ClickFunnelBump,
};

export { ClickFunnelBump as default };
