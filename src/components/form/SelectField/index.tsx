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
  placeholder,
  required,
  options,
}: SelectFieldProps): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={name}
          name={name}
          required={required}
          className={styles.select}
          defaultValue=""
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} />
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
