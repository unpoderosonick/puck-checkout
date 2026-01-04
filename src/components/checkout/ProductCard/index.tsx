import type { ComponentConfig } from '@measured/puck';
import type { ReactNode } from 'react';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  image: string;
  name: string | ReactNode;
  variant: string | ReactNode;
  price: number;
  quantity: number;
  showQuantityBadge: boolean;
}

export const ProductCard = ({
  image,
  name,
  variant,
  price,
  quantity,
  showQuantityBadge,
}: ProductCardProps): JSX.Element => {
  return (
    <div className={styles.product}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={typeof name === 'string' ? name : 'Product'} className={styles.image} />
        {showQuantityBadge && quantity > 1 && (
          <span className={styles.quantityBadge}>{quantity}</span>
        )}
      </div>
      <div className={styles.details}>
        <span className={styles.name}>{name}</span>
        {variant && <span className={styles.variant}>{variant}</span>}
      </div>
      <div className={styles.priceWrapper}>
        <span className={styles.price}>
          ${(price * quantity).toFixed(2)}
        </span>
        {quantity > 1 && (
          <span className={styles.unitPrice}>
            ${price.toFixed(2)} each
          </span>
        )}
      </div>
    </div>
  );
};

export const productCardConfig: ComponentConfig<ProductCardProps> = {
  label: 'Product Card',
  fields: {
    image: {
      type: 'text',
      label: 'Image URL',
    },
    name: {
      type: 'text',
      label: 'Product Name',
      contentEditable: true,
    },
    variant: {
      type: 'text',
      label: 'Variant (Size, Color, etc.)',
      contentEditable: true,
    },
    price: {
      type: 'number',
      label: 'Price',
    },
    quantity: {
      type: 'number',
      label: 'Quantity',
    },
    showQuantityBadge: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Show Quantity Badge',
    },
  },
  defaultProps: {
    image: 'https://via.placeholder.com/80x80?text=Product',
    name: 'Premium Product',
    variant: 'Default',
    price: 49.99,
    quantity: 1,
    showQuantityBadge: true,
  },
  render: ProductCard,
};

export { ProductCard as default };
