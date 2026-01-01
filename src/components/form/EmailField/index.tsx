import type { ComponentConfig } from '@measured/puck';
import styles from './EmailField.module.css';

export interface EmailFieldProps {
  name: string;
  placeholder: string;
  required: boolean;
  showNewsletter: boolean;
  newsletterText: string;
}

export const EmailField = ({
  name,
  placeholder,
  required,
  showNewsletter,
  newsletterText,
}: EmailFieldProps): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <input
        type="email"
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
      {showNewsletter && (
        <label className={styles.checkbox}>
          <input type="checkbox" name="newsletter" />
          <span className={styles.checkboxText}>{newsletterText}</span>
        </label>
      )}
    </div>
  );
};

export const emailFieldConfig: ComponentConfig<EmailFieldProps> = {
  label: 'Email Field',
  fields: {
    name: {
      type: 'text',
      label: 'Field Name',
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
    showNewsletter: {
      type: 'radio',
      label: 'Show Newsletter Checkbox',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    newsletterText: {
      type: 'text',
      label: 'Newsletter Text',
    },
  },
  defaultProps: {
    name: 'email',
    placeholder: 'Email',
    required: true,
    showNewsletter: true,
    newsletterText: 'Email me with news and offers',
  },
  render: EmailField,
};

export { EmailField as default };
