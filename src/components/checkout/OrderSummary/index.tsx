import type { ComponentConfig } from '@measured/puck';
import { useCheckoutStore } from '../../../store/checkoutStore';
import styles from './OrderSummary.module.css';

const QuestionIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  shippingLabel: string;
  discount: number;
  discountCode: string;
  tax: number;
  showTax: boolean;
  currency: string;
}

export const OrderSummary = ({
  subtotal,
  shipping: defaultShipping,
  shippingLabel,
  discount,
  discountCode,
  tax,
  showTax,
  currency,
}: OrderSummaryProps): JSX.Element => {
  // Get dynamic values from store
  const storeShipping = useCheckoutStore((state) => state.getShippingCost());
  const storeTip = useCheckoutStore((state) => state.tipAmount);

  // Use store values if available, otherwise use props
  const shipping = storeShipping > 0 ? storeShipping : defaultShipping;
  const tip = storeTip;

  const total = subtotal - discount + shipping + (showTax ? tax : 0) + tip;
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '$';

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span className={styles.label}>Subtotal</span>
        <span className={styles.value}>{currencySymbol}{subtotal.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <div className={styles.row}>
          <span className={styles.label}>
            Discount
            {discountCode && (
              <span className={styles.discountCode}>{discountCode}</span>
            )}
          </span>
          <span className={styles.discountValue}>-{currencySymbol}{discount.toFixed(2)}</span>
        </div>
      )}

      <div className={styles.row}>
        <span className={styles.label}>
          Shipping
          <span className={styles.helpIcon}><QuestionIcon /></span>
        </span>
        <span className={styles.value}>
          {shipping === 0 ? (
            <span className={styles.freeShipping}>Free</span>
          ) : (
            `${currencySymbol}${shipping.toFixed(2)}`
          )}
        </span>
      </div>
      {shipping === 0 && shippingLabel && (
        <div className={styles.shippingNote}>{shippingLabel}</div>
      )}

      {tip > 0 && (
        <div className={styles.row}>
          <span className={styles.label}>Tip</span>
          <span className={styles.value}>{currencySymbol}{tip.toFixed(2)}</span>
        </div>
      )}

      {showTax && (
        <div className={styles.row}>
          <span className={styles.label}>Tax</span>
          <span className={styles.value}>{currencySymbol}{tax.toFixed(2)}</span>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>
          <span className={styles.currency}>{currency}</span>
          {currencySymbol}{total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export const orderSummaryConfig: ComponentConfig<OrderSummaryProps> = {
  label: 'Order Summary',
  fields: {
    subtotal: {
      type: 'number',
      label: 'Subtotal',
    },
    shipping: {
      type: 'number',
      label: 'Default Shipping Cost',
    },
    shippingLabel: {
      type: 'text',
      label: 'Shipping Note (shown when free)',
    },
    discount: {
      type: 'number',
      label: 'Discount Amount',
    },
    discountCode: {
      type: 'text',
      label: 'Discount Code',
    },
    tax: {
      type: 'number',
      label: 'Tax Amount',
    },
    showTax: {
      type: 'radio',
      label: 'Show Tax',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    currency: {
      type: 'select',
      label: 'Currency',
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
        { label: 'CAD ($)', value: 'CAD' },
      ],
    },
  },
  defaultProps: {
    subtotal: 129.00,
    shipping: 0,
    shippingLabel: 'Enter shipping address',
    discount: 0,
    discountCode: '',
    tax: 0,
    showTax: false,
    currency: 'USD',
  },
  render: OrderSummary,
};

export { OrderSummary as default };
