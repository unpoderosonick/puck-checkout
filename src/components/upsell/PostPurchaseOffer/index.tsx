import type { ComponentConfig } from '@measured/puck';
import type { ReactNode } from 'react';
import styles from './PostPurchaseOffer.module.css';

export interface PostPurchaseOfferProps {
  headline: string | ReactNode;
  subheadline: string | ReactNode;
  image: string;
  productName: string | ReactNode;
  features: { feature: string }[];
  originalPrice: number;
  offerPrice: number;
  showCountdown: boolean;
  countdownSeconds: number;
  acceptText: string | ReactNode;
  declineText: string | ReactNode;
}

export const PostPurchaseOffer = ({
  headline,
  subheadline,
  image,
  productName,
  features,
  originalPrice,
  offerPrice,
  showCountdown,
  countdownSeconds,
  acceptText,
  declineText,
}: PostPurchaseOfferProps): JSX.Element => {
  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.checkIcon}>✓</span>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.subheadline}>{subheadline}</p>
        </div>

        {showCountdown && (
          <div className={styles.countdown}>
            <span className={styles.countdownLabel}>This offer expires in:</span>
            <div className={styles.timer}>
              <div className={styles.timerBlock}>
                <span className={styles.timerNumber}>{String(minutes).padStart(2, '0')}</span>
                <span className={styles.timerLabel}>min</span>
              </div>
              <span className={styles.timerSeparator}>:</span>
              <div className={styles.timerBlock}>
                <span className={styles.timerNumber}>{String(seconds).padStart(2, '0')}</span>
                <span className={styles.timerLabel}>sec</span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={typeof productName === 'string' ? productName : 'Product'} className={styles.image} />
          </div>

          <div className={styles.details}>
            <h3 className={styles.productName}>{productName}</h3>

            <ul className={styles.features}>
              {features.map((item, index) => (
                <li key={index} className={styles.feature}>
                  <span className={styles.featureCheck}>✓</span>
                  {item.feature}
                </li>
              ))}
            </ul>

            <div className={styles.pricing}>
              <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
              <span className={styles.offerPrice}>${offerPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.acceptButton}>
            {acceptText}
          </button>
          <button className={styles.declineButton}>
            {declineText}
          </button>
        </div>
      </div>
    </div>
  );
};

export const postPurchaseOfferConfig: ComponentConfig<PostPurchaseOfferProps> = {
  label: 'Post Purchase Offer',
  fields: {
    headline: {
      type: 'text',
      label: 'Headline',
      contentEditable: true,
    },
    subheadline: {
      type: 'text',
      label: 'Subheadline',
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
    features: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        feature: { type: 'text', label: 'Feature' },
      },
      defaultItemProps: { feature: 'Feature' },
      getItemSummary: (item: { feature: string }) => item.feature || 'Feature',
    },
    originalPrice: {
      type: 'number',
      label: 'Original Price',
    },
    offerPrice: {
      type: 'number',
      label: 'Offer Price',
    },
    showCountdown: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Show Countdown',
    },
    countdownSeconds: {
      type: 'number',
      label: 'Countdown Seconds',
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
    headline: 'Wait! Your Order is Almost Complete',
    subheadline: 'Add this exclusive item to your order before it\'s gone!',
    image: 'https://via.placeholder.com/300x300?text=Premium+Product',
    productName: 'Premium Extended Warranty',
    features: [
      { feature: '3-Year Extended Coverage' },
      { feature: 'Accidental Damage Protection' },
      { feature: 'Free Shipping on Repairs' },
      { feature: '24/7 Priority Support' },
    ],
    originalPrice: 99.99,
    offerPrice: 29.99,
    showCountdown: true,
    countdownSeconds: 300,
    acceptText: 'Yes! Add to My Order',
    declineText: 'No thanks, complete my order',
  },
  render: PostPurchaseOffer,
};

export { PostPurchaseOffer as default };
