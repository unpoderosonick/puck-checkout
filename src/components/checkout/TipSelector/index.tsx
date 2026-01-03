import { useState, useEffect } from 'react';
import type { ComponentConfig } from '@measured/puck';
import { useCheckoutStore } from '../../../store/checkoutStore';
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
  subtotal: number;
}

export const TipSelector = ({
  options,
  showCustom,
  customPlaceholder,
  selectedValue,
  subtotal,
}: TipSelectorProps): JSX.Element => {
  const [selected, setSelected] = useState<number | 'custom'>(selectedValue === 0 ? 0 : selectedValue);
  const [customAmount, setCustomAmount] = useState('');
  const setTipAmount = useCheckoutStore((state) => state.setTipAmount);

  // Calculate tip amount based on selection
  const calculateTip = (optionValue: number, isPercentage: boolean): number => {
    if (isPercentage) {
      return (subtotal * optionValue) / 100;
    }
    return optionValue;
  };

  // Update store when selection changes
  useEffect(() => {
    if (selected === 0) {
      setTipAmount(0);
    } else if (selected === 'custom') {
      const amount = parseFloat(customAmount) || 0;
      setTipAmount(amount);
    } else {
      const option = options.find(o => o.value === selected);
      if (option) {
        setTipAmount(calculateTip(option.value, option.isPercentage));
      }
    }
  }, [selected, customAmount, options, subtotal, setTipAmount]);

  const handleOptionChange = (value: number) => {
    setSelected(value);
    setCustomAmount('');
  };

  const handleNoTip = () => {
    setSelected(0);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelected('custom');
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {options.map((option, index) => {
          const tipAmount = option.isPercentage
            ? (subtotal * option.value) / 100
            : option.value;

          return (
            <label
              key={index}
              className={`${styles.option} ${selected === option.value ? styles.selected : ''}`}
            >
              <input
                type="radio"
                name="tip"
                value={option.value}
                checked={selected === option.value}
                onChange={() => handleOptionChange(option.value)}
                className={styles.radio}
              />
              <span className={styles.label}>
                {option.isPercentage ? `${option.value}%` : `$${option.value}`}
              </span>
              {option.isPercentage && (
                <span className={styles.amount}>{formatCurrency(tipAmount)}</span>
              )}
            </label>
          );
        })}

        <label className={`${styles.option} ${styles.noTip} ${selected === 0 ? styles.selected : ''}`}>
          <input
            type="radio"
            name="tip"
            value="0"
            checked={selected === 0}
            onChange={handleNoTip}
            className={styles.radio}
          />
          <span className={styles.label}>None</span>
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
            value={customAmount}
            onChange={handleCustomChange}
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
    subtotal: {
      type: 'number',
      label: 'Subtotal (for % calculation)',
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
        label: '5%',
        value: 5,
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
    title: '',
    description: '',
    subtotal: 129.00,
    options: [
      { label: '5%', value: 5, isPercentage: true },
      { label: '10%', value: 10, isPercentage: true },
      { label: '20%', value: 20, isPercentage: true },
    ],
    showCustom: true,
    customPlaceholder: 'Custom tip',
    selectedValue: 0,
  },
  render: TipSelector,
};

export { TipSelector as default };
