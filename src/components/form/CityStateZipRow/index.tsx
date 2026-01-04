import type { ComponentConfig } from '@measured/puck';
import styles from './CityStateZipRow.module.css';

export interface StateOption {
  label: string;
  value: string;
}

export interface CityStateZipRowProps {
  cityPlaceholder: string;
  statePlaceholder: string;
  zipPlaceholder: string;
  states: StateOption[];
  required: boolean;
}

export const CityStateZipRow = ({
  cityPlaceholder,
  statePlaceholder,
  zipPlaceholder,
  states,
  required,
}: CityStateZipRowProps): JSX.Element => {
  return (
    <div className={styles.row}>
      <input
        type="text"
        name="city"
        placeholder={cityPlaceholder}
        required={required}
        className={styles.input}
        autoComplete="address-level2"
      />
      <div className={styles.selectWrapper}>
        <select
          name="state"
          required={required}
          className={styles.select}
          autoComplete="address-level1"
          defaultValue=""
        >
          <option value="" disabled>{statePlaceholder}</option>
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
        <span className={styles.selectIcon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <input
        type="text"
        name="zip"
        placeholder={zipPlaceholder}
        required={required}
        className={styles.input}
        autoComplete="postal-code"
      />
    </div>
  );
};

export const cityStateZipRowConfig: ComponentConfig<CityStateZipRowProps> = {
  label: 'City/State/ZIP Row',
  fields: {
    cityPlaceholder: {
      type: 'text',
      label: 'City Placeholder',
    },
    statePlaceholder: {
      type: 'text',
      label: 'State Placeholder',
    },
    zipPlaceholder: {
      type: 'text',
      label: 'ZIP Placeholder',
    },
    states: {
      type: 'array',
      label: 'States',
      arrayFields: {
        label: { type: 'text', label: 'Label' },
        value: { type: 'text', label: 'Value' },
      },
      defaultItemProps: {
        label: 'State',
        value: 'ST',
      },
    },
    required: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Required',
    },
  },
  defaultProps: {
    cityPlaceholder: 'City',
    statePlaceholder: 'State',
    zipPlaceholder: 'ZIP code',
    states: [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK' },
      { label: 'Arizona', value: 'AZ' },
      { label: 'California', value: 'CA' },
      { label: 'Colorado', value: 'CO' },
      { label: 'Florida', value: 'FL' },
      { label: 'Georgia', value: 'GA' },
      { label: 'New York', value: 'NY' },
      { label: 'Texas', value: 'TX' },
      { label: 'Washington', value: 'WA' },
    ],
    required: true,
  },
  render: CityStateZipRow,
};

export { CityStateZipRow as default };
