import { useState, useEffect } from 'react';
import type { ComponentConfig } from '@measured/puck';
import { useCheckoutStore } from '../../../store/checkoutStore';
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
  selectedMethod: defaultSelected,
  currency,
}: ShippingSelectorProps): JSX.Element => {
  const [selected, setSelected] = useState(defaultSelected);
  const setShippingMethods = useCheckoutStore((state) => state.setShippingMethods);
  const setSelectedShipping = useCheckoutStore((state) => state.setSelectedShipping);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$';

  // Update store with methods on mount
  useEffect(() => {
    setShippingMethods(methods.map(m => ({
      id: m.id,
      name: m.name,
      price: m.price,
      estimatedDays: m.estimatedDays,
    })));
    setSelectedShipping(defaultSelected);
  }, [methods, defaultSelected, setShippingMethods, setSelectedShipping]);

  const handleChange = (methodId: string) => {
    setSelected(methodId);
    setSelectedShipping(methodId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.methods}>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`${styles.method} ${selected === method.id ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name="shipping_method"
              value={method.id}
              checked={selected === method.id}
              onChange={() => handleChange(method.id)}
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
        estimatedDays: '',
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
      { id: 'standard', name: 'Secure Standard Shipping', description: '', price: 4.95, estimatedDays: '' },
      { id: 'express', name: 'Fast Shipping + Insurance + Tracking', description: '', price: 7.95, estimatedDays: '' },
    ],
    selectedMethod: 'standard',
    currency: 'USD',
  },
  render: ShippingSelector,
};

export { ShippingSelector as default };
