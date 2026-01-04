import type { ComponentConfig } from '@measured/puck';
import styles from './NameFieldsRow.module.css';

export interface NameFieldsRowProps {
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  required: boolean;
}

export const NameFieldsRow = ({
  firstNamePlaceholder,
  lastNamePlaceholder,
  required,
}: NameFieldsRowProps): JSX.Element => {
  return (
    <div className={styles.row}>
      <input
        type="text"
        name="firstName"
        placeholder={firstNamePlaceholder}
        required={required}
        className={styles.input}
        autoComplete="given-name"
      />
      <input
        type="text"
        name="lastName"
        placeholder={lastNamePlaceholder}
        required={required}
        className={styles.input}
        autoComplete="family-name"
      />
    </div>
  );
};

export const nameFieldsRowConfig: ComponentConfig<NameFieldsRowProps> = {
  label: 'Name Fields Row',
  fields: {
    firstNamePlaceholder: {
      type: 'text',
      label: 'First Name Placeholder',
    },
    lastNamePlaceholder: {
      type: 'text',
      label: 'Last Name Placeholder',
    },
    required: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Required',
    },
  },
  defaultProps: {
    firstNamePlaceholder: 'First name',
    lastNamePlaceholder: 'Last name',
    required: true,
  },
  render: NameFieldsRow,
};

export { NameFieldsRow as default };
