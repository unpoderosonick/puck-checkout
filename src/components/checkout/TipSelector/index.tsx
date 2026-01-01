import type { ComponentConfig } from '@measured/puck';
import styles from './TipSelector.module.css';

export interface TipOption {
  label: string;
  value: number;
  isPercentage: boolean;
}

export interface TipSelectorProps {
  title: string;
  description: string;
  options: TipOption[];
  showCustom: boolean;
  customPlaceholder: string;
  selectedValue: number;
}

export const TipSelector = ({
  title,
  description,
  options,
  showCustom,
  customPlaceholder,
  selectedValue,
}: TipSelectorProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {title && <h4 className={styles.title}>{title}</h4>}
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.options}>
        {options.map((option, index) => (
          <label
            key={index}
            className={`${styles.option} ${selectedValue === option.value ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name="tip"
              value={option.value}
              defaultChecked={selectedValue === option.value}
              className={styles.radio}
            />
            <span className={styles.label}>
              {option.isPercentage ? `${option.value}%` : `$${option.value}`}
            </span>
          </label>
        ))}

        <label className={`${styles.option} ${styles.noTip}`}>
          <input
            type="radio"
            name="tip"
            value="0"
            defaultChecked={selectedValue === 0}
            className={styles.radio}
          />
          <span className={styles.label}>No tip</span>
        </label>
      </div>

      {showCustom && (
        <div className={styles.customWrapper}>
          <span className={styles.currencyPrefix}>$</span>
          <input
            type="number"
            placeholder={customPlaceholder}
            className={styles.customInput}
            min="0"
            step="0.01"
          />
        </div>
      )}
    </div>
  );
};

export const tipSelectorConfig: ComponentConfig<TipSelectorProps> = {
  label: 'Tip Selector',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'text',
      label: 'Description',
    },
    options: {
      type: 'array',
      label: 'Tip Options',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        value: { type: 'number', label: 'Value' },
        isPercentage: {
          type: 'radio',
          label: 'Is Percentage',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultItemProps: {
        label: '15%',
        value: 15,
        isPercentage: true,
      },
    },
    showCustom: {
      type: 'radio',
      label: 'Show Custom Amount',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    customPlaceholder: {
      type: 'text',
      label: 'Custom Input Placeholder',
    },
    selectedValue: {
      type: 'number',
      label: 'Default Selected Value',
    },
  },
  defaultProps: {
    title: 'Add a tip',
    description: 'Show your support for the team',
    options: [
      { label: '15%', value: 15, isPercentage: true },
      { label: '20%', value: 20, isPercentage: true },
      { label: '25%', value: 25, isPercentage: true },
    ],
    showCustom: true,
    customPlaceholder: 'Custom amount',
    selectedValue: 0,
  },
  render: TipSelector,
};

export { TipSelector as default };
