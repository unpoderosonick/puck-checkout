import type { Data } from '@measured/puck';

export const defaultCheckoutData: Data = {
  root: {},
  content: [
    // Header - Black background with white text
    {
      type: 'Header',
      props: {
        id: 'header-1',
        logo: '',
        logoAlt: 'Store Logo',
        logoWidth: 150,
        backgroundColor: '#000000',
        textColor: 'light',
        alignment: 'center',
        showSecureBadge: true,
      },
    },
    // Main checkout layout - two columns
    {
      type: 'CheckoutContainer',
      props: {
        id: 'checkout-container',
        layout: '55-45',
      },
    },
    // Footer links
    {
      type: 'FooterLinks',
      props: {
        id: 'footer-1',
        links: [
          { text: 'Refund policy', url: '#' },
          { text: 'Shipping policy', url: '#' },
          { text: 'Privacy policy', url: '#' },
          { text: 'Terms of service', url: '#' },
          { text: 'Contact information', url: '#' },
        ],
        separator: '',
        alignment: 'left',
        copyright: '',
        showCopyright: false,
      },
    },
  ],
  zones: {
    // ===== MAIN COLUMN (Left) =====
    'checkout-container:main': [
      // Contact Section
      {
        type: 'Section',
        props: {
          id: 'section-contact',
          title: 'Contact',
          showTitle: true,
          collapsible: false,
        },
      },
      // Delivery Section
      {
        type: 'Section',
        props: {
          id: 'section-delivery',
          title: 'Delivery',
          showTitle: true,
          collapsible: false,
        },
      },
      // Shipping Method Section
      {
        type: 'Section',
        props: {
          id: 'section-shipping',
          title: 'Shipping method',
          showTitle: true,
          collapsible: false,
        },
      },
      // Payment Section
      {
        type: 'Section',
        props: {
          id: 'section-payment',
          title: 'Payment',
          showTitle: true,
          collapsible: false,
        },
      },
      // Tip Section
      {
        type: 'Section',
        props: {
          id: 'section-tip',
          title: 'Add tip',
          showTitle: true,
          collapsible: false,
        },
      },
      // Submit Button
      {
        type: 'SubmitButton',
        props: {
          id: 'submit-btn',
          text: 'Pay now',
          showLockIcon: false,
          showAmount: false,
          amount: 0,
          currency: 'USD',
          size: 'large',
          fullWidth: true,
          variant: 'primary',
        },
      },
    ],

    // ===== SIDEBAR COLUMN (Right) =====
    'checkout-container:sidebar': [
      // Product Card
      {
        type: 'ProductCard',
        props: {
          id: 'product-1',
          image: 'https://cdn.shopify.com/s/files/1/0591/6400/0352/files/lanus-img-pp-1.png?v=1765209143',
          name: 'Lanus™ El Cielo es Tuyo!',
          variant: 'Lanus™ Pro (2 batteries)',
          price: 129.00,
          quantity: 1,
          showQuantityBadge: true,
        },
      },
      // Divider
      {
        type: 'Divider',
        props: {
          id: 'divider-1',
          spacing: 'medium',
          showLine: true,
        },
      },
      // Discount Input
      {
        type: 'DiscountInput',
        props: {
          id: 'discount-1',
          placeholder: 'Discount code',
          buttonText: 'Apply',
          showIcon: false,
        },
      },
      // Divider
      {
        type: 'Divider',
        props: {
          id: 'divider-2',
          spacing: 'medium',
          showLine: true,
        },
      },
      // Order Summary
      {
        type: 'OrderSummary',
        props: {
          id: 'order-summary',
          subtotal: 129.00,
          shipping: 0,
          shippingLabel: 'Enter shipping address',
          discount: 0,
          discountCode: '',
          tax: 0,
          showTax: false,
          currency: 'USD',
        },
      },
    ],

    // ===== CONTACT SECTION CONTENT =====
    'section-contact:content': [
      {
        type: 'EmailField',
        props: {
          id: 'email-field',
          name: 'email',
          placeholder: 'Email',
          required: true,
          showNewsletter: true,
          newsletterText: 'Email me with news and offers',
        },
      },
    ],

    // ===== DELIVERY SECTION CONTENT =====
    'section-delivery:content': [
      // Country Select
      {
        type: 'SelectField',
        props: {
          id: 'country-field',
          name: 'country',
          label: 'Country / Region',
          placeholder: 'Select country',
          required: true,
          options: [
            { label: 'United States', value: 'US' },
            { label: 'Canada', value: 'CA' },
            { label: 'United Kingdom', value: 'GB' },
            { label: 'Australia', value: 'AU' },
            { label: 'Germany', value: 'DE' },
            { label: 'France', value: 'FR' },
            { label: 'Spain', value: 'ES' },
            { label: 'Mexico', value: 'MX' },
          ],
        },
      },
      // First Name / Last Name Row
      {
        type: 'NameFieldsRow',
        props: {
          id: 'name-row',
          firstNamePlaceholder: 'First name',
          lastNamePlaceholder: 'Last name',
          required: true,
        },
      },
      // Address Field
      {
        type: 'AddressField',
        props: {
          id: 'address-field',
          name: 'address',
          placeholder: 'Address',
          required: true,
          showApartment: true,
          apartmentPlaceholder: 'Apartment, suite, etc. (optional)',
        },
      },
      // City / State / ZIP Row
      {
        type: 'CityStateZipRow',
        props: {
          id: 'city-row',
          cityPlaceholder: 'City',
          statePlaceholder: 'State',
          zipPlaceholder: 'ZIP code',
          states: [
            { label: 'Alabama', value: 'AL' },
            { label: 'Alaska', value: 'AK' },
            { label: 'Arizona', value: 'AZ' },
            { label: 'California', value: 'CA' },
            { label: 'Colorado', value: 'CO' },
            { label: 'Florida', value: 'FL' },
            { label: 'Georgia', value: 'GA' },
            { label: 'New York', value: 'NY' },
            { label: 'Texas', value: 'TX' },
            { label: 'Washington', value: 'WA' },
          ],
          required: true,
        },
      },
      // Phone Field
      {
        type: 'PhoneField',
        props: {
          id: 'phone-field',
          name: 'phone',
          placeholder: 'Phone',
          required: false,
          defaultCountry: 'US',
          showFlag: true,
        },
      },
      // SMS Marketing Checkbox
      {
        type: 'CheckboxField',
        props: {
          id: 'sms-checkbox',
          name: 'sms_marketing',
          label: 'Text me with news and offers',
          defaultChecked: false,
          required: false,
        },
      },
    ],

    // ===== SHIPPING SECTION CONTENT =====
    'section-shipping:content': [
      {
        type: 'ShippingSelector',
        props: {
          id: 'shipping-selector',
          methods: [
            {
              id: 'standard',
              name: 'Secure Standard Shipping',
              description: '',
              price: 4.95,
              estimatedDays: '',
            },
            {
              id: 'express',
              name: 'Fast Shipping + Insurance + Tracking',
              description: '',
              price: 7.95,
              estimatedDays: '',
            },
          ],
          selectedMethod: 'standard',
          currency: 'USD',
        },
      },
    ],

    // ===== PAYMENT SECTION CONTENT =====
    'section-payment:content': [
      {
        type: 'PaymentSelector',
        props: {
          id: 'payment-selector',
          securityText: 'All transactions are secure and encrypted.',
          showCreditCard: true,
          showPayPal: true,
          showApplePay: false,
          showGooglePay: false,
          selectedMethod: 'card',
        },
      },
      {
        type: 'CheckboxField',
        props: {
          id: 'billing-checkbox',
          name: 'use_shipping_as_billing',
          label: 'Use shipping address as billing address',
          defaultChecked: true,
          required: false,
        },
      },
    ],

    // ===== TIP SECTION CONTENT =====
    'section-tip:content': [
      {
        type: 'CheckboxField',
        props: {
          id: 'tip-enable-checkbox',
          name: 'show_tip',
          label: 'Show your support for the team',
          defaultChecked: true,
          required: false,
        },
      },
      {
        type: 'TipSelector',
        props: {
          id: 'tip-selector',
          title: '',
          description: '',
          subtotal: 129.00,
          options: [
            { label: '5%', value: 5, isPercentage: true },
            { label: '10%', value: 10, isPercentage: true },
            { label: '20%', value: 20, isPercentage: true },
          ],
          showCustom: true,
          customPlaceholder: 'Custom tip',
          selectedValue: 0,
        },
      },
    ],
  },
};
