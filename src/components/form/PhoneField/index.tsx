import type { ComponentConfig } from '@measured/puck';
import styles from './PhoneField.module.css';

export interface PhoneFieldProps {
  name: string;
  placeholder: string;
  required: boolean;
  defaultCountry: string;
  showFlag: boolean;
}

const countries = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
];

export const PhoneField = ({
  name,
  placeholder,
  required,
  defaultCountry,
  showFlag,
}: PhoneFieldProps): JSX.Element => {
  const selectedCountry = countries.find((c) => c.code === defaultCountry) || countries[0];

  return (
    <div className={styles.formGroup}>
      <div className={styles.phoneWrapper}>
        <div className={styles.countrySelector}>
          <select
            className={styles.countrySelect}
            defaultValue={defaultCountry}
            aria-label="Country code"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {showFlag ? `${country.flag} ${country.dial}` : country.dial}
              </option>
            ))}
          </select>
          <span className={styles.countryDisplay}>
            {showFlag && selectedCountry.flag} {selectedCountry.dial}
          </span>
        </div>
        <input
          type="tel"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export const phoneFieldConfig: ComponentConfig<PhoneFieldProps> = {
  label: 'Phone Field',
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
    defaultCountry: {
      type: 'select',
      label: 'Default Country',
      options: [
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
        { label: 'Mexico', value: 'MX' },
        { label: 'United Kingdom', value: 'GB' },
        { label: 'Spain', value: 'ES' },
        { label: 'France', value: 'FR' },
        { label: 'Germany', value: 'DE' },
      ],
    },
    showFlag: {
      type: 'radio',
      label: 'Show Flag',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    name: 'phone',
    placeholder: 'Phone number',
    required: false,
    defaultCountry: 'US',
    showFlag: true,
  },
  render: PhoneField,
};

export { PhoneField as default };
