import React from 'react';
import type { Config } from '@measured/puck';

// Layout Components
import { checkoutContainerConfig } from '../components/layout/CheckoutContainer';
import { sectionConfig } from '../components/layout/Section';
import { formRowConfig } from '../components/layout/FormRow';
import { dividerConfig } from '../components/layout/Divider';

// Form Components
import { textFieldConfig } from '../components/form/TextField';
import { emailFieldConfig } from '../components/form/EmailField';
import { phoneFieldConfig } from '../components/form/PhoneField';
import { selectFieldConfig } from '../components/form/SelectField';
import { addressFieldConfig } from '../components/form/AddressField';
import { checkboxFieldConfig } from '../components/form/CheckboxField';
import { nameFieldsRowConfig } from '../components/form/NameFieldsRow';
import { cityStateZipRowConfig } from '../components/form/CityStateZipRow';

// Checkout Components
import { productCardConfig } from '../components/checkout/ProductCard';
import { orderSummaryConfig } from '../components/checkout/OrderSummary';
import { shippingSelectorConfig } from '../components/checkout/ShippingSelector';
import { paymentSelectorConfig } from '../components/checkout/PaymentSelector';
import { discountInputConfig } from '../components/checkout/DiscountInput';
import { tipSelectorConfig } from '../components/checkout/TipSelector';

// Upsell Components
import { upsellCardConfig } from '../components/upsell/UpsellCard';
import { postPurchaseOfferConfig } from '../components/upsell/PostPurchaseOffer';
import { downsellModalConfig } from '../components/upsell/DownsellModal';
import { orderBumpConfig } from '../components/upsell/OrderBump';
import { bundleBuilderConfig } from '../components/upsell/BundleBuilder';
import { clickFunnelBumpConfig } from '../components/upsell/ClickFunnelBump';

// Branding Components
import { headerConfig } from '../components/branding/Header';
import { submitButtonConfig } from '../components/branding/SubmitButton';
import { trustBadgesConfig } from '../components/branding/TrustBadges';
import { footerLinksConfig } from '../components/branding/FooterLinks';

export const config: Config = {
  categories: {
    upsell: {
      title: 'Upsell & Offers',
      components: ['UpsellCard', 'PostPurchaseOffer', 'DownsellModal', 'OrderBump', 'BundleBuilder', 'ClickFunnelBump'],
      defaultExpanded: true,
    },
    layout: {
      title: 'Layout',
      components: ['CheckoutContainer', 'Section', 'FormRow', 'Divider'],
      defaultExpanded: true,
    },
    form: {
      title: 'Form Fields',
      components: ['TextField', 'EmailField', 'PhoneField', 'SelectField', 'AddressField', 'CheckboxField', 'NameFieldsRow', 'CityStateZipRow'],
      defaultExpanded: true,
    },
    checkout: {
      title: 'Checkout',
      components: ['ProductCard', 'OrderSummary', 'ShippingSelector', 'PaymentSelector', 'DiscountInput', 'TipSelector'],
      defaultExpanded: true,
    },
    branding: {
      title: 'Branding',
      components: ['Header', 'SubmitButton', 'TrustBadges', 'FooterLinks'],
      defaultExpanded: true,
    },
  },

  root: {
    fields: {
      primaryColor: {
        type: 'text',
        label: 'Primary Color',
      },
      secondaryColor: {
        type: 'text',
        label: 'Secondary Color',
      },
      fontFamily: {
        type: 'select',
        label: 'Font Family',
        options: [
          { label: 'Inter', value: 'Inter' },
          { label: 'System Default', value: 'system-ui' },
          { label: 'Roboto', value: 'Roboto' },
        ],
      },
    },
    defaultProps: {
      primaryColor: '#1773b0',
      secondaryColor: '#125a8a',
      fontFamily: 'Inter',
    },
    render: (props: { children?: React.ReactNode; primaryColor?: string; secondaryColor?: string; fontFamily?: string }) => (
      <div
        style={{
          '--puck-primary': props.primaryColor,
          '--puck-secondary': props.secondaryColor,
          '--puck-font-family': props.fontFamily,
        } as React.CSSProperties}
      >
        {props.children}
      </div>
    ),
  },

  components: {
    // Layout
    CheckoutContainer: checkoutContainerConfig,
    Section: sectionConfig,
    FormRow: formRowConfig,
    Divider: dividerConfig,

    // Form
    TextField: textFieldConfig,
    EmailField: emailFieldConfig,
    PhoneField: phoneFieldConfig,
    SelectField: selectFieldConfig,
    AddressField: addressFieldConfig,
    CheckboxField: checkboxFieldConfig,
    NameFieldsRow: nameFieldsRowConfig,
    CityStateZipRow: cityStateZipRowConfig,

    // Checkout
    ProductCard: productCardConfig,
    OrderSummary: orderSummaryConfig,
    ShippingSelector: shippingSelectorConfig,
    PaymentSelector: paymentSelectorConfig,
    DiscountInput: discountInputConfig,
    TipSelector: tipSelectorConfig,

    // Upsell
    UpsellCard: upsellCardConfig,
    PostPurchaseOffer: postPurchaseOfferConfig,
    DownsellModal: downsellModalConfig,
    OrderBump: orderBumpConfig,
    BundleBuilder: bundleBuilderConfig,
    ClickFunnelBump: clickFunnelBumpConfig,

    // Branding
    Header: headerConfig,
    SubmitButton: submitButtonConfig,
    TrustBadges: trustBadgesConfig,
    FooterLinks: footerLinksConfig,
  },
};
