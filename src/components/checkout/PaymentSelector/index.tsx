import type { ComponentConfig } from '@measured/puck';
import styles from './PaymentSelector.module.css';

export interface PaymentSelectorProps {
  showCreditCard: boolean;
  showPayPal: boolean;
  showApplePay: boolean;
  showGooglePay: boolean;
  selectedMethod: string;
}

export const PaymentSelector = ({
  showCreditCard,
  showPayPal,
  showApplePay,
  showGooglePay,
  selectedMethod,
}: PaymentSelectorProps): JSX.Element => {
  const methods = [
    { id: 'card', name: 'Credit Card', icon: '💳', enabled: showCreditCard },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', enabled: showPayPal },
    { id: 'applepay', name: 'Apple Pay', icon: '🍎', enabled: showApplePay },
    { id: 'googlepay', name: 'Google Pay', icon: '🔵', enabled: showGooglePay },
  ].filter((m) => m.enabled);

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
              name="payment_method"
              value={method.id}
              defaultChecked={selectedMethod === method.id}
              className={styles.radio}
            />
            <span className={styles.radioCircle} />
            <span className={styles.icon}>{method.icon}</span>
            <span className={styles.name}>{method.name}</span>
          </label>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className={styles.cardForm}>
          <div className={styles.cardField}>
            <input
              type="text"
              placeholder="Card number"
              className={styles.input}
            />
            <div className={styles.cardIcons}>
              <span className={styles.cardIcon}>💳</span>
            </div>
          </div>
          <div className={styles.cardRow}>
            <input
              type="text"
              placeholder="MM / YY"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="CVV"
              className={styles.input}
            />
          </div>
          <input
            type="text"
            placeholder="Name on card"
            className={styles.input}
          />
        </div>
      )}
    </div>
  );
};

export const paymentSelectorConfig: ComponentConfig<PaymentSelectorProps> = {
  label: 'Payment Selector',
  fields: {
    showCreditCard: {
      type: 'radio',
      label: 'Show Credit Card',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showPayPal: {
      type: 'radio',
      label: 'Show PayPal',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showApplePay: {
      type: 'radio',
      label: 'Show Apple Pay',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showGooglePay: {
      type: 'radio',
      label: 'Show Google Pay',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    selectedMethod: {
      type: 'select',
      label: 'Default Selected',
      options: [
        { label: 'Credit Card', value: 'card' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Apple Pay', value: 'applepay' },
        { label: 'Google Pay', value: 'googlepay' },
      ],
    },
  },
  defaultProps: {
    showCreditCard: true,
    showPayPal: true,
    showApplePay: false,
    showGooglePay: false,
    selectedMethod: 'card',
  },
  render: PaymentSelector,
};

export { PaymentSelector as default };
