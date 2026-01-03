import type { ComponentConfig } from '@measured/puck';
import styles from './OrderBump.module.css';

export interface OrderBumpProps {
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  checkboxLabel: string;
  highlighted: boolean;
}

export const OrderBump = ({
  title,
  description,
  image,
  price,
  originalPrice,
  checkboxLabel,
  highlighted,
}: OrderBumpProps): JSX.Element => {
  const hasDiscount = originalPrice > price;

  return (
    <div className={`${styles.container} ${highlighted ? styles.highlighted : ''}`}>
      {highlighted && <div className={styles.highlightBar} />}

      <label className={styles.bump}>
        <div className={styles.checkbox}>
          <input type="checkbox" className={styles.input} />
          <span className={styles.checkmark} />
        </div>

        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>

        <div className={styles.details}>
          <span className={styles.checkboxLabel}>{checkboxLabel}</span>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{description}</p>

          <div className={styles.pricing}>
            {hasDiscount && (
              <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
            )}
            <span className={styles.price}>${price.toFixed(2)}</span>
            {hasDiscount && (
              <span className={styles.badge}>
                Save ${(originalPrice - price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export const orderBumpConfig: ComponentConfig<OrderBumpProps> = {
  label: 'Order Bump',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    description: {
      type: 'textarea',
      label: 'Description',
    },
    image: {
      type: 'text',
      label: 'Image URL',
    },
    price: {
      type: 'number',
      label: 'Price',
    },
    originalPrice: {
      type: 'number',
      label: 'Original Price',
    },
    checkboxLabel: {
      type: 'text',
      label: 'Checkbox Label',
    },
    highlighted: {
      type: 'radio',
      label: 'Highlighted',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    title: 'Premium Gift Wrapping',
    description: 'Make your order extra special with our premium gift wrapping service.',
    image: 'https://via.placeholder.com/80x80?text=Gift',
    price: 4.99,
    originalPrice: 9.99,
    checkboxLabel: 'Yes! Add this to my order',
    highlighted: true,
  },
  render: OrderBump,
};

export { OrderBump as default };
