import type { ComponentConfig } from '@measured/puck';
import styles from './SelectField.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  options: SelectOption[];
}

export const SelectField = ({
  name,
  label,
  required,
  options,
}: SelectFieldProps): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <div className={styles.selectWrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <select
          id={name}
          name={name}
          required={required}
          className={styles.select}
          defaultValue={options[0]?.value || ''}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow}>
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  );
};

export const selectFieldConfig: ComponentConfig<SelectFieldProps> = {
  label: 'Select Field',
  fields: {
    name: {
      type: 'text',
      label: 'Field Name',
    },
    label: {
      type: 'text',
      label: 'Label',
    },
    placeholder: {
      type: 'text',
      label: 'Placeholder',
    },
    required: {
      type: 'radio',
      label: 'Required',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    options: {
      type: 'array',
      label: 'Options',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        value: { type: 'text', label: 'Value' },
      },
      defaultItemProps: {
        label: 'Option',
        value: 'option',
      },
    },
  },
  defaultProps: {
    name: 'select',
    label: '',
    placeholder: 'Select an option',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
  render: SelectField,
};

export { SelectField as default };
