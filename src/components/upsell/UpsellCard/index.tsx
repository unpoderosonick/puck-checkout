import type { ComponentConfig } from '@measured/puck';
import type { ReactNode } from 'react';
import styles from './UpsellCard.module.css';

export interface UpsellCardProps {
  image: string;
  title: string | ReactNode;
  description: string | ReactNode;
  originalPrice: number;
  salePrice: number;
  discountBadge: string | ReactNode;
  showTimer: boolean;
  timerMinutes: number;
  buttonText: string | ReactNode;
  declineText: string | ReactNode;
}

export const UpsellCard = ({
  image,
  title,
  description,
  originalPrice,
  salePrice,
  discountBadge,
  showTimer,
  timerMinutes,
  buttonText,
  declineText,
}: UpsellCardProps): JSX.Element => {
  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

  return (
    <div className={styles.card}>
      {discountBadge && (
        <span className={styles.badge}>{discountBadge}</span>
      )}

      {showTimer && (
        <div className={styles.timer}>
          <span className={styles.timerIcon}>⏱️</span>
          <span className={styles.timerText}>
            Offer expires in {timerMinutes}:00
          </span>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={typeof title === 'string' ? title : 'Upsell product'} className={styles.image} />
        </div>

        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>

          <div className={styles.pricing}>
            <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
            <span className={styles.salePrice}>${salePrice.toFixed(2)}</span>
            <span className={styles.savings}>Save {discount}%</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.acceptButton}>{buttonText}</button>
        <button className={styles.declineButton}>{declineText}</button>
      </div>
    </div>
  );
};

export const upsellCardConfig: ComponentConfig<UpsellCardProps> = {
  label: 'Upsell Card',
  fields: {
    image: {
      type: 'text',
      label: 'Image URL',
    },
    title: {
      type: 'text',
      label: 'Title',
      contentEditable: true,
    },
    description: {
      type: 'textarea',
      label: 'Description',
      contentEditable: true,
    },
    originalPrice: {
      type: 'number',
      label: 'Original Price',
    },
    salePrice: {
      type: 'number',
      label: 'Sale Price',
    },
    discountBadge: {
      type: 'text',
      label: 'Discount Badge Text',
      contentEditable: true,
    },
    showTimer: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Show Timer',
    },
    timerMinutes: {
      type: 'number',
      label: 'Timer Minutes',
    },
    buttonText: {
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
    image: 'https://via.placeholder.com/200x200?text=Upsell',
    title: 'Special One-Time Offer',
    description: 'Add this premium accessory to your order at an exclusive discount!',
    originalPrice: 49.99,
    salePrice: 19.99,
    discountBadge: '60% OFF',
    showTimer: true,
    timerMinutes: 5,
    buttonText: 'Yes, Add to Order!',
    declineText: 'No thanks, I\'ll pass',
  },
  render: UpsellCard,
};

export { UpsellCard as default };
