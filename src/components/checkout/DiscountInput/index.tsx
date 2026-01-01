import type { ComponentConfig } from '@measured/puck';
import styles from './DiscountInput.module.css';

export interface DiscountInputProps {
  placeholder: string;
  buttonText: string;
  showIcon: boolean;
}

export const DiscountInput = ({
  placeholder,
  buttonText,
  showIcon,
}: DiscountInputProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        {showIcon && <span className={styles.icon}>🏷️</span>}
        <input
          type="text"
          placeholder={placeholder}
          className={styles.input}
        />
        <button type="button" className={styles.button}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export const discountInputConfig: ComponentConfig<DiscountInputProps> = {
  label: 'Discount Input',
  fields: {
    placeholder: {
      type: 'text',
      label: 'Placeholder',
    },
    buttonText: {
      type: 'text',
      label: 'Button Text',
    },
    showIcon: {
      type: 'radio',
      label: 'Show Icon',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    placeholder: 'Discount code or gift card',
    buttonText: 'Apply',
    showIcon: true,
  },
  render: DiscountInput,
};

export { DiscountInput as default };
