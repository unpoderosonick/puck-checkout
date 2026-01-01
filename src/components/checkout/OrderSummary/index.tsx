import type { ComponentConfig } from '@measured/puck';
import styles from './OrderSummary.module.css';

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
  shipping,
  shippingLabel,
  discount,
  discountCode,
  tax,
  showTax,
  currency,
}: OrderSummaryProps): JSX.Element => {
  const total = subtotal - discount + shipping + (showTax ? tax : 0);
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
        <span className={styles.label}>Shipping</span>
        <span className={styles.value}>
          {shipping === 0 ? (
            <span className={styles.freeShipping}>Free</span>
          ) : (
            `${currencySymbol}${shipping.toFixed(2)}`
          )}
        </span>
      </div>
      {shippingLabel && (
        <div className={styles.shippingNote}>{shippingLabel}</div>
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
      label: 'Shipping Cost',
    },
    shippingLabel: {
      type: 'text',
      label: 'Shipping Method Label',
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
    subtotal: 149.99,
    shipping: 5.99,
    shippingLabel: 'Standard Shipping (5-7 days)',
    discount: 0,
    discountCode: '',
    tax: 12.50,
    showTax: true,
    currency: 'USD',
  },
  render: OrderSummary,
};

export { OrderSummary as default };
