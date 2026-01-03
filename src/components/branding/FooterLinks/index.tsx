import type { ComponentConfig } from '@measured/puck';
import styles from './FooterLinks.module.css';

export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterLinksProps {
  links: FooterLink[];
  separator: string;
  alignment: 'left' | 'center' | 'right';
  copyright: string;
  showCopyright: boolean;
}

export const FooterLinks = ({
  links,
  separator,
  alignment,
  copyright,
  showCopyright,
}: FooterLinksProps): JSX.Element => {
  return (
    <footer className={`${styles.footer} ${styles[alignment]}`}>
      <div className={styles.footerContent}>
        <nav className={styles.links}>
          {links.map((link, index) => (
            <span key={index}>
              <a href={link.url} className={styles.link}>
                {link.text}
              </a>
              {index < links.length - 1 && (
                <span className={styles.separator}>{separator}</span>
              )}
            </span>
          ))}
        </nav>

        {showCopyright && (
          <p className={styles.copyright}>{copyright}</p>
        )}
      </div>
    </footer>
  );
};

export const footerLinksConfig: ComponentConfig<FooterLinksProps> = {
  label: 'Footer Links',
  fields: {
    links: {
      type: 'array',
      label: 'Links',
      arrayFields: {
        text: { type: 'text', label: 'Text' },
        url: { type: 'text', label: 'URL' },
      },
      defaultItemProps: {
        text: 'Link',
        url: '#',
      },
      getItemSummary: (item) => item.text || 'Link',
    },
    separator: {
      type: 'text',
      label: 'Separator',
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
    copyright: {
      type: 'text',
      label: 'Copyright Text',
    },
    showCopyright: {
      type: 'radio',
      label: 'Show Copyright',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
  },
  defaultProps: {
    links: [
      { text: 'Privacy Policy', url: '#privacy' },
      { text: 'Terms of Service', url: '#terms' },
      { text: 'Refund Policy', url: '#refund' },
      { text: 'Contact Us', url: '#contact' },
    ],
    separator: '•',
    alignment: 'center',
    copyright: '© 2024 Your Company. All rights reserved.',
    showCopyright: true,
  },
  render: FooterLinks,
};

export { FooterLinks as default };
