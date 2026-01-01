import type { ComponentConfig } from '@measured/puck';
import styles from './ShippingSelector.module.css';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface ShippingSelectorProps {
  methods: ShippingMethod[];
  selectedMethod: string;
  currency: string;
}

export const ShippingSelector = ({
  methods,
  selectedMethod,
  currency,
}: ShippingSelectorProps): JSX.Element => {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$';

  return (
    <div className={styles.container}>
      <div className={styles.methods}>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`${styles.method} ${selectedMethod === method.id ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name="shipping_method"
              value={method.id}
              defaultChecked={selectedMethod === method.id}
              className={styles.radio}
            />
            <span className={styles.radioCircle} />
            <div className={styles.methodInfo}>
              <div className={styles.methodHeader}>
                <span className={styles.methodName}>{method.name}</span>
                <span className={styles.methodPrice}>
                  {method.price === 0 ? 'Free' : `${currencySymbol}${method.price.toFixed(2)}`}
                </span>
              </div>
              {method.description && (
                <span className={styles.methodDescription}>{method.description}</span>
              )}
              {method.estimatedDays && (
                <span className={styles.estimatedDays}>{method.estimatedDays}</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export const shippingSelectorConfig: ComponentConfig<ShippingSelectorProps> = {
  label: 'Shipping Selector',
  fields: {
    methods: {
      type: 'array',
      label: 'Shipping Methods',
      arrayFields: {
        id: { type: 'text', label: 'ID' },
        name: { type: 'text', label: 'Name' },
        description: { type: 'text', label: 'Description' },
        price: { type: 'number', label: 'Price' },
        estimatedDays: { type: 'text', label: 'Estimated Delivery' },
      },
      defaultItemProps: {
        id: 'method',
        name: 'Shipping Method',
        description: '',
        price: 0,
        estimatedDays: '5-7 business days',
      },
    },
    selectedMethod: {
      type: 'text',
      label: 'Default Selected Method ID',
    },
    currency: {
      type: 'select',
      label: 'Currency',
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
      ],
    },
  },
  defaultProps: {
    methods: [
      { id: 'standard', name: 'Standard Shipping', description: '', price: 5.99, estimatedDays: '5-7 business days' },
      { id: 'express', name: 'Express Shipping', description: '', price: 12.99, estimatedDays: '2-3 business days' },
      { id: 'overnight', name: 'Overnight', description: '', price: 24.99, estimatedDays: 'Next business day' },
    ],
    selectedMethod: 'standard',
    currency: 'USD',
  },
  render: ShippingSelector,
};

export { ShippingSelector as default };
