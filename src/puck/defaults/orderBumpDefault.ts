import type { Data } from '@measured/puck';

export const defaultOrderBumpData: Data = {
  root: {},
  content: [
    // Header
    {
      type: 'Header',
      props: {
        id: 'header-orderbump',
        logo: '',
        logoAlt: 'Store Logo',
        logoWidth: 150,
        backgroundColor: '#000000',
        textColor: 'light',
        alignment: 'center',
        showSecureBadge: true,
      },
    },
    // Main Section with Order Bump
    {
      type: 'Section',
      props: {
        id: 'section-orderbump',
        title: 'Wait! Special Offer Just For You',
        showTitle: true,
        collapsible: false,
      },
    },
    // Footer links
    {
      type: 'FooterLinks',
      props: {
        id: 'footer-orderbump',
        links: [
          { text: 'Privacy policy', url: '#' },
          { text: 'Terms of service', url: '#' },
        ],
        separator: '',
        alignment: 'center',
        copyright: '',
        showCopyright: false,
      },
    },
  ],
  zones: {
    // Order Bump Section Content
    'section-orderbump:content': [
      // ClickFunnel Style Bump
      {
        type: 'ClickFunnelBump',
        props: {
          id: 'cfbump-1',
          checkboxLabel: 'Yes, I want this special offer!',
          offerTitle: 'ONE TIME OFFER',
          offerDescription: 'Add our premium accessory pack to your order for just $19.99 (normally $49.99). This exclusive bundle includes a protective case, extra cables, and a cleaning kit - everything you need to get the most out of your purchase.',
          borderColor: '#8B4513',
          backgroundColor: '#FDF5E6',
          checkboxHighlightColor: '#FFEB3B',
          showArrow: true,
        },
      },
      // Divider
      {
        type: 'Divider',
        props: {
          id: 'divider-orderbump',
          spacing: 'large',
          showLine: false,
        },
      },
      // Order Bump Card
      {
        type: 'OrderBump',
        props: {
          id: 'orderbump-1',
          productImage: 'https://via.placeholder.com/100x100?text=Bonus',
          productName: 'Extended Warranty',
          price: 14.99,
          originalPrice: 29.99,
          description: 'Protect your purchase with our 2-year extended warranty. Covers accidental damage and defects.',
          checkboxLabel: 'Add to my order',
          highlighted: true,
          highlightColor: '#008060',
        },
      },
      // Divider
      {
        type: 'Divider',
        props: {
          id: 'divider-orderbump-2',
          spacing: 'large',
          showLine: false,
        },
      },
      // Continue Button
      {
        type: 'SubmitButton',
        props: {
          id: 'orderbump-continue',
          text: 'Continue to Complete Order',
          showLockIcon: false,
          showAmount: false,
          amount: 0,
          currency: 'USD',
          size: 'large',
          fullWidth: true,
          variant: 'primary',
        },
      },
      // Skip Link
      {
        type: 'SubmitButton',
        props: {
          id: 'orderbump-skip',
          text: 'No thanks, continue without offer',
          showLockIcon: false,
          showAmount: false,
          amount: 0,
          currency: 'USD',
          size: 'medium',
          fullWidth: true,
          variant: 'secondary',
        },
      },
    ],
  },
};
