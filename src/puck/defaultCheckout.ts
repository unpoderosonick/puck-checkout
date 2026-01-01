import type { Data } from '@measured/puck';

export const defaultCheckoutData: Data = {
  root: {},
  content: [
    {
      type: 'Header',
      props: {
        id: 'header-1',
        logo: '',
        logoAlt: 'Store Logo',
        logoWidth: 150,
        alignment: 'center',
        backgroundColor: '#1773b0',
        showSecureBadge: true,
      },
    },
    {
      type: 'CheckoutContainer',
      props: {
        id: 'container-1',
        layout: '55-45',
      },
    },
  ],
  zones: {
    'container-1:main': [],
    'container-1:sidebar': [],
  },
};
