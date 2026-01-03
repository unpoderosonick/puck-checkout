import type { ComponentConfig } from '@measured/puck';
import styles from './PaymentSelector.module.css';

// Card brand icons from Shopify CDN
const CARD_ICONS = {
  visa: 'https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/visa.sxIq5Dot.svg',
  mastercard: 'https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/mastercard.1c4_lyMp.svg',
  amex: 'https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/amex.Csr7hRoy.svg',
};

// PayPal logo URL
const PAYPAL_LOGO = 'https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png';

const LockIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const QuestionIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CardBrandIcons = (): JSX.Element => (
  <div className={styles.cardBrands}>
    <img src={CARD_ICONS.visa} alt="Visa" className={styles.cardBrandIcon} />
    <img src={CARD_ICONS.mastercard} alt="Mastercard" className={styles.cardBrandIcon} />
    <img src={CARD_ICONS.amex} alt="American Express" className={styles.cardBrandIcon} />
    <span className={styles.moreCards}>+3</span>
  </div>
);

const PayPalLogo = (): JSX.Element => (
  <img src={PAYPAL_LOGO} alt="PayPal" className={styles.paypalLogo} />
);

export interface PaymentSelectorProps {
  showCreditCard: boolean;
  showPayPal: boolean;
  showApplePay: boolean;
  showGooglePay: boolean;
  selectedMethod: string;
  securityText: string;
}

export const PaymentSelector = ({
  showCreditCard,
  showPayPal,
  showApplePay,
  showGooglePay,
  selectedMethod,
  securityText,
}: PaymentSelectorProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {securityText && (
        <p className={styles.securityText}>{securityText}</p>
      )}

      <div className={styles.methods}>
        {/* Credit Card Option */}
        {showCreditCard && (
          <>
            <label className={`${styles.method} ${selectedMethod === 'card' ? styles.selected : ''}`}>
              <input
                type="radio"
                name="payment_method"
                value="card"
                defaultChecked={selectedMethod === 'card'}
                className={styles.radio}
              />
              <span className={styles.radioCircle} />
              <span className={styles.name}>Credit card</span>
              <CardBrandIcons />
            </label>

            {selectedMethod === 'card' && (
              <div className={styles.cardForm}>
                <div className={styles.cardField}>
                  <input
                    type="text"
                    placeholder="Card number"
                    className={styles.input}
                    autoComplete="cc-number"
                  />
                  <span className={styles.fieldIcon}>
                    <LockIcon />
                  </span>
                </div>

                <div className={styles.cardRow}>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      placeholder="Expiration date (MM / YY)"
                      className={styles.input}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      placeholder="Security code"
                      className={styles.input}
                      autoComplete="cc-csc"
                    />
                    <span className={styles.fieldIcon}>
                      <QuestionIcon />
                    </span>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Name on card"
                  className={styles.input}
                  autoComplete="cc-name"
                  style={{ paddingRight: '16px' }}
                />
              </div>
            )}
          </>
        )}

        {/* PayPal Option */}
        {showPayPal && (
          <>
            <label className={`${styles.method} ${selectedMethod === 'paypal' ? styles.selected : ''}`}>
              <input
                type="radio"
                name="payment_method"
                value="paypal"
                defaultChecked={selectedMethod === 'paypal'}
                className={styles.radio}
              />
              <span className={styles.radioCircle} />
              <span className={styles.name}>PayPal</span>
              <div className={styles.methodLogo}>
                <PayPalLogo />
              </div>
            </label>

            {selectedMethod === 'paypal' && (
              <div className={styles.paypalContent}>
                <div className={styles.paypalMessage}>
                  <PayPalLogo />
                  <p>After clicking &quot;Pay now&quot;, you will be redirected to PayPal to complete your purchase securely.</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Apple Pay Option */}
        {showApplePay && (
          <label className={`${styles.method} ${selectedMethod === 'applepay' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="payment_method"
              value="applepay"
              defaultChecked={selectedMethod === 'applepay'}
              className={styles.radio}
            />
            <span className={styles.radioCircle} />
            <span className={styles.name}>Apple Pay</span>
          </label>
        )}

        {/* Google Pay Option */}
        {showGooglePay && (
          <label className={`${styles.method} ${selectedMethod === 'googlepay' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="payment_method"
              value="googlepay"
              defaultChecked={selectedMethod === 'googlepay'}
              className={styles.radio}
            />
            <span className={styles.radioCircle} />
            <span className={styles.name}>Google Pay</span>
          </label>
        )}
      </div>
    </div>
  );
};

export const paymentSelectorConfig: ComponentConfig<PaymentSelectorProps> = {
  label: 'Payment Selector',
  fields: {
    securityText: {
      type: 'text',
      label: 'Security Text',
    },
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
    securityText: 'All transactions are secure and encrypted.',
    showCreditCard: true,
    showPayPal: true,
    showApplePay: false,
    showGooglePay: false,
    selectedMethod: 'card',
  },
  render: PaymentSelector,
};

export { PaymentSelector as default };
