import type { ComponentConfig } from '@measured/puck';
import styles from './AddressField.module.css';

export interface AddressFieldProps {
  name: string;
  placeholder: string;
  required: boolean;
  showApartment: boolean;
  apartmentPlaceholder: string;
}

export const AddressField = ({
  name,
  placeholder,
  required,
  showApartment,
  apartmentPlaceholder,
}: AddressFieldProps): JSX.Element => {
  return (
    <div className={styles.formGroup}>
      <div className={styles.addressWrapper}>
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={styles.input}
          autoComplete="street-address"
        />
        {showApartment && (
          <input
            type="text"
            id={`${name}_apt`}
            name={`${name}_apt`}
            placeholder={apartmentPlaceholder}
            className={styles.aptInput}
            autoComplete="address-line2"
          />
        )}
      </div>
    </div>
  );
};

export const addressFieldConfig: ComponentConfig<AddressFieldProps> = {
  label: 'Address Field',
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
    showApartment: {
      type: 'radio',
      label: 'Show Apartment Field',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    apartmentPlaceholder: {
      type: 'text',
      label: 'Apartment Placeholder',
    },
  },
  defaultProps: {
    name: 'address',
    placeholder: 'Address',
    required: true,
    showApartment: true,
    apartmentPlaceholder: 'Apt, suite, etc. (optional)',
  },
  render: AddressField,
};

export { AddressField as default };
