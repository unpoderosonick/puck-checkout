import type { ComponentConfig } from '@measured/puck';
import styles from './BundleBuilder.module.css';

export interface BundleProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  selected: boolean;
}

export interface BundleBuilderProps {
  title: string;
  subtitle: string;
  products: BundleProduct[];
  discountPercentage: number;
  addButtonText: string;
}

export const BundleBuilder = ({
  title,
  subtitle,
  products,
  discountPercentage,
  addButtonText,
}: BundleBuilderProps): JSX.Element => {
  const selectedProducts = products.filter((p) => p.selected);
  const totalOriginal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const totalDiscounted = totalOriginal * (1 - discountPercentage / 100);
  const savings = totalOriginal - totalDiscounted;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <span className={styles.discountBadge}>Save {discountPercentage}%</span>
      </div>

      <div className={styles.products}>
        {products.map((product, index) => (
          <label key={product.id} className={styles.product}>
            <input
              type="checkbox"
              defaultChecked={product.selected}
              className={styles.checkbox}
            />
            <span className={styles.checkmark} />
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.productInfo}>
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
            </div>
            {index < products.length - 1 && <span className={styles.plus}>+</span>}
          </label>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.pricing}>
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Regular Price:</span>
            <span className={styles.originalPrice}>${totalOriginal.toFixed(2)}</span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Bundle Price:</span>
            <span className={styles.bundlePrice}>${totalDiscounted.toFixed(2)}</span>
          </div>
          <div className={styles.savingsRow}>
            <span className={styles.savingsLabel}>You Save:</span>
            <span className={styles.savingsValue}>${savings.toFixed(2)}</span>
          </div>
        </div>

        <button className={styles.addButton}>
          {addButtonText}
        </button>
      </div>
    </div>
  );
};

export const bundleBuilderConfig: ComponentConfig<BundleBuilderProps> = {
  label: 'Bundle Builder',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle',
    },
    products: {
      type: 'array',
      label: 'Products',
      arrayFields: {
        id: { type: 'text', label: 'ID' },
        name: { type: 'text', label: 'Name' },
        image: { type: 'text', label: 'Image URL' },
        price: { type: 'number', label: 'Price' },
        selected: {
          type: 'radio',
          label: 'Pre-selected',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
        },
      },
      defaultItemProps: {
        id: 'product',
        name: 'Product',
        image: 'https://via.placeholder.com/60x60',
        price: 19.99,
        selected: true,
      },
    },
    discountPercentage: {
      type: 'number',
      label: 'Discount Percentage',
    },
    addButtonText: {
      type: 'text',
      label: 'Add Button Text',
    },
  },
  defaultProps: {
    title: 'Complete Your Setup',
    subtitle: 'Bundle these items together and save!',
    products: [
      { id: '1', name: 'Main Product', image: 'https://via.placeholder.com/60x60?text=1', price: 49.99, selected: true },
      { id: '2', name: 'Accessory Pack', image: 'https://via.placeholder.com/60x60?text=2', price: 29.99, selected: true },
      { id: '3', name: 'Protection Plan', image: 'https://via.placeholder.com/60x60?text=3', price: 19.99, selected: false },
    ],
    discountPercentage: 20,
    addButtonText: 'Add Bundle to Cart',
  },
  render: BundleBuilder,
};

export { BundleBuilder as default };
