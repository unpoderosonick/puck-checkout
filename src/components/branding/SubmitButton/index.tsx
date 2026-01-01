import type { ComponentConfig } from '@measured/puck';
import styles from './SubmitButton.module.css';

export interface SubmitButtonProps {
  text: string;
  showLockIcon: boolean;
  showAmount: boolean;
  amount: number;
  currency: string;
  size: 'medium' | 'large';
  fullWidth: boolean;
  variant: 'primary' | 'success' | 'dark';
}

export const SubmitButton = ({
  text,
  showLockIcon,
  showAmount,
  amount,
  currency,
  size,
  fullWidth,
  variant,
}: SubmitButtonProps): JSX.Element => {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$';

  return (
    <button
      type="submit"
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
    >
      {showLockIcon && <span className={styles.lockIcon}>🔒</span>}
      <span className={styles.text}>{text}</span>
      {showAmount && (
        <span className={styles.amount}>
          {currencySymbol}{amount.toFixed(2)}
        </span>
      )}
    </button>
  );
};

export const submitButtonConfig: ComponentConfig<SubmitButtonProps> = {
  label: 'Submit Button',
  fields: {
    text: {
      type: 'text',
      label: 'Button Text',
    },
    showLockIcon: {
      type: 'radio',
      label: 'Show Lock Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showAmount: {
      type: 'radio',
      label: 'Show Amount',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    amount: {
      type: 'number',
      label: 'Amount',
    },
    currency: {
      type: 'select',
      label: 'Currency',
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
      ],
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    fullWidth: {
      type: 'radio',
      label: 'Full Width',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Primary (Blue)', value: 'primary' },
        { label: 'Success (Green)', value: 'success' },
        { label: 'Dark (Black)', value: 'dark' },
      ],
    },
  },
  defaultProps: {
    text: 'Complete Order',
    showLockIcon: true,
    showAmount: true,
    amount: 149.99,
    currency: 'USD',
    size: 'large',
    fullWidth: true,
    variant: 'primary',
  },
  render: SubmitButton,
};

export { SubmitButton as default };
