import type { ComponentConfig } from '@measured/puck';
import styles from './Header.module.css';

export interface HeaderProps {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  backgroundColor: string;
  textColor: 'light' | 'dark';
  alignment: 'left' | 'center' | 'right';
  showSecureBadge: boolean;
}

export const Header = ({
  logo,
  logoAlt,
  logoWidth,
  backgroundColor,
  textColor,
  alignment,
  showSecureBadge,
}: HeaderProps): JSX.Element => {
  return (
    <header
      className={`${styles.header} ${styles[textColor]}`}
      style={{ backgroundColor }}
    >
      <div className={`${styles.content} ${styles[alignment]}`}>
        <div className={styles.logoWrapper}>
          {logo ? (
            <img
              src={logo}
              alt={logoAlt}
              className={styles.logo}
              style={{ maxWidth: logoWidth }}
            />
          ) : (
            <span className={styles.logoPlaceholder}>Your Logo</span>
          )}
        </div>

        {showSecureBadge && (
          <div className={styles.secureBadge}>
            <span className={styles.lockIcon}>🔒</span>
            <span className={styles.secureText}>Secure Checkout</span>
          </div>
        )}
      </div>
    </header>
  );
};

export const headerConfig: ComponentConfig<HeaderProps> = {
  label: 'Header',
  fields: {
    logo: {
      type: 'text',
      label: 'Logo URL',
    },
    logoAlt: {
      type: 'text',
      label: 'Logo Alt Text',
    },
    logoWidth: {
      type: 'number',
      label: 'Logo Max Width (px)',
    },
    backgroundColor: {
      type: 'text',
      label: 'Background Color',
    },
    textColor: {
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'Dark (for light backgrounds)', value: 'dark' },
        { label: 'Light (for dark backgrounds)', value: 'light' },
      ],
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
    showSecureBadge: {
      type: 'radio',
      label: 'Show Secure Badge',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    logo: '',
    logoAlt: 'Company Logo',
    logoWidth: 150,
    backgroundColor: '#ffffff',
    textColor: 'dark',
    alignment: 'center',
    showSecureBadge: true,
  },
  render: Header,
};

export { Header as default };
