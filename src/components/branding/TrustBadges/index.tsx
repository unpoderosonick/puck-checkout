import type { ComponentConfig } from '@measured/puck';
import styles from './TrustBadges.module.css';

export interface TrustBadge {
  icon: string;
  label: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  alignment: 'left' | 'center' | 'right';
  size: 'small' | 'medium' | 'large';
  showLabels: boolean;
}

export const TrustBadges = ({
  badges,
  alignment,
  size,
  showLabels,
}: TrustBadgesProps): JSX.Element => {
  return (
    <div className={`${styles.container} ${styles[alignment]}`}>
      <div className={`${styles.badges} ${styles[size]}`}>
        {badges.map((badge, index) => (
          <div key={index} className={styles.badge}>
            <span className={styles.icon}>{badge.icon}</span>
            {showLabels && <span className={styles.label}>{badge.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export const trustBadgesConfig: ComponentConfig<TrustBadgesProps> = {
  label: 'Trust Badges',
  fields: {
    badges: {
      type: 'array',
      label: 'Badges',
      arrayFields: {
        icon: { type: 'text', label: 'Icon (emoji or URL)' },
        label: { type: 'text', label: 'Label' },
      },
      defaultItemProps: {
        icon: '🔒',
        label: 'Secure',
      },
      getItemSummary: (item) => item.label || 'Badge',
    },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    size: {
      type: 'select',
      label: 'Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    showLabels: {
      type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
      label: 'Show Labels',
    },
  },
  defaultProps: {
    badges: [
      { icon: '🔒', label: 'Secure Checkout' },
      { icon: '💳', label: 'Safe Payments' },
      { icon: '🚚', label: 'Free Shipping' },
      { icon: '↩️', label: '30-Day Returns' },
    ],
    alignment: 'center',
    size: 'medium',
    showLabels: true,
  },
  render: TrustBadges,
};

export { TrustBadges as default };
