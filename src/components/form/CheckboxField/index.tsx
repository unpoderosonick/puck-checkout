import type { ComponentConfig } from '@measured/puck';
import styles from './CheckboxField.module.css';

export interface CheckboxFieldProps {
  name: string;
  label: string;
  defaultChecked: boolean;
  required: boolean;
}

export const CheckboxField = ({
  name,
  label,
  defaultChecked,
  required,
}: CheckboxFieldProps): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          id={name}
          name={name}
          defaultChecked={defaultChecked}
          required={required}
          className={styles.input}
        />
        <span className={styles.checkmark} />
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      </label>
    </div>
  );
};

export const checkboxFieldConfig: ComponentConfig<CheckboxFieldProps> = {
  label: 'Checkbox Field',
  fields: {
    name: {
      type: 'text',
      label: 'Field Name',
    },
    label: {
      type: 'text',
      label: 'Label',
    },
    defaultChecked: {
      type: 'radio',
      label: 'Default Checked',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    required: {
      type: 'radio',
      label: 'Required',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    name: 'checkbox',
    label: 'I agree to the terms and conditions',
    defaultChecked: false,
    required: false,
  },
  render: CheckboxField,
};

export { CheckboxField as default };
