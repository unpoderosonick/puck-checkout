import type { Data } from '@measured/puck';

export const defaultDownsellData: Data = {
  root: {},
  content: [
    // Header
    {
      type: 'Header',
      props: {
        id: 'header-downsell',
        logo: '',
        logoAlt: 'Store Logo',
        logoWidth: 150,
        backgroundColor: '#000000',
        textColor: 'light',
        alignment: 'center',
        showSecureBadge: true,
      },
    },
    // Main Downsell Section
    {
      type: 'Section',
      props: {
        id: 'section-downsell',
        title: 'Before You Go...',
        showTitle: true,
        collapsible: false,
      },
    },
    // Footer links
    {
      type: 'FooterLinks',
      props: {
        id: 'footer-downsell',
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
    // Downsell Section Content
    'section-downsell:content': [
      // Downsell Modal Component
      {
        type: 'DownsellModal',
        props: {
          id: 'downsell-modal-1',
          title: 'Wait! We Have a Better Deal',
          message: 'We noticed you passed on our last offer. How about this exclusive deal instead? Get the same great value at an even lower price!',
          image: 'https://via.placeholder.com/200x200?text=Deal',
          productName: 'Basic Protection Plan',
          originalPrice: 29.99,
          downsellPrice: 9.99,
          acceptText: "Yes, I'll Take This Deal!",
          declineText: "No thanks, I'll pass",
        },
      },
      // Divider
      {
        type: 'Divider',
        props: {
          id: 'divider-downsell',
          spacing: 'large',
          showLine: false,
        },
      },
      // Trust Badges
      {
        type: 'TrustBadges',
        props: {
          id: 'trust-downsell',
          badges: [
            { type: 'guarantee', label: '30-Day Money Back' },
            { type: 'secure', label: 'Secure Checkout' },
            { type: 'support', label: '24/7 Support' },
          ],
          alignment: 'center',
          size: 'medium',
          showLabels: true,
        },
      },
      // Divider
      {
        type: 'Divider',
        props: {
          id: 'divider-downsell-2',
          spacing: 'medium',
          showLine: false,
        },
      },
      // Accept Button
      {
        type: 'SubmitButton',
        props: {
          id: 'downsell-accept',
          text: 'Yes! Add This to My Order',
          showLockIcon: false,
          showAmount: true,
          amount: 9.99,
          currency: 'USD',
          size: 'large',
          fullWidth: true,
          variant: 'primary',
        },
      },
      // Decline Button
      {
        type: 'SubmitButton',
        props: {
          id: 'downsell-decline',
          text: 'No thanks, complete my order',
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
