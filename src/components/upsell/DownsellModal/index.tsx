import type { ComponentConfig } from '@measured/puck';
import type { ReactNode } from 'react';
import styles from './DownsellModal.module.css';

export interface DownsellModalProps {
  title: string | ReactNode;
  message: string | ReactNode;
  image: string;
  productName: string | ReactNode;
  originalPrice: number;
  downsellPrice: number;
  acceptText: string | ReactNode;
  declineText: string | ReactNode;
}

export const DownsellModal = ({
  title,
  message,
  image,
  productName,
  originalPrice,
  downsellPrice,
  acceptText,
  declineText,
}: DownsellModalProps): JSX.Element => {
  const savings = originalPrice - downsellPrice;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.product}>
            <img src={image} alt={typeof productName === 'string' ? productName : 'Product'} className={styles.image} />
            <div className={styles.details}>
              <h3 className={styles.productName}>{productName}</h3>
              <div className={styles.pricing}>
                <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.downsellPrice}>${downsellPrice.toFixed(2)}</span>
              </div>
              <span className={styles.savings}>You save ${savings.toFixed(2)}!</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.acceptButton}>{acceptText}</button>
          <button className={styles.declineButton}>{declineText}</button>
        </div>
      </div>
    </div>
  );
};

export const downsellModalConfig: ComponentConfig<DownsellModalProps> = {
  label: 'Downsell Modal',
  fields: {
    title: {
      type: 'text',
      label: 'Title',
      contentEditable: true,
    },
    message: {
      type: 'textarea',
      label: 'Message',
      contentEditable: true,
    },
    image: {
      type: 'text',
      label: 'Product Image URL',
    },
    productName: {
      type: 'text',
      label: 'Product Name',
      contentEditable: true,
    },
    originalPrice: {
      type: 'number',
      label: 'Original Price',
    },
    downsellPrice: {
      type: 'number',
      label: 'Downsell Price',
    },
    acceptText: {
      type: 'text',
      label: 'Accept Button Text',
      contentEditable: true,
    },
    declineText: {
      type: 'text',
      label: 'Decline Button Text',
      contentEditable: true,
    },
  },
  defaultProps: {
    title: 'Wait! Special Offer Just for You',
    message: 'We noticed you passed on our last offer. How about this exclusive deal instead?',
    image: 'https://via.placeholder.com/150x150?text=Deal',
    productName: 'Basic Protection Plan',
    originalPrice: 29.99,
    downsellPrice: 9.99,
    acceptText: 'Yes, I\'ll Take This Deal!',
    declineText: 'No, I really don\'t want it',
  },
  render: DownsellModal,
};

export { DownsellModal as default };
