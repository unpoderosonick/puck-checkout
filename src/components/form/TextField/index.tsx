import type { ComponentConfig } from '@measured/puck';
import styles from './TextField.module.css';

export interface TextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'number';
  required: boolean;
  helpText: string;
}

export const TextField = ({
  name,
  label,
  placeholder,
  type,
  required,
  helpText,
}: TextFieldProps): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
      {helpText && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
};

export const textFieldConfig: ComponentConfig<TextFieldProps> = {
  label: 'Text Field',
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
    type: {
      type: 'select',
      label: 'Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'tel' },
        { label: 'Number', value: 'number' },
      ],
    },
    required: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Required',
    },
    helpText: {
      type: 'text',
      label: 'Help Text',
    },
  },
  defaultProps: {
    name: 'field',
    label: '',
    placeholder: 'Enter value',
    type: 'text',
    required: false,
    helpText: '',
  },
  render: TextField,
};

export { TextField as default };
