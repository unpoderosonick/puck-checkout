// Cart Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  originalPrice?: number;
  isUpsell?: boolean;
  isOrderBump?: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  days: string;
}

export interface UpsellProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description?: string;
}

// Form Types
export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

// Component Props Types
export interface CheckoutContainerProps {
  layout: '60-40' | '55-45' | '50-50';
}

export interface SectionProps {
  title: string;
  showTitle: boolean;
  collapsible: boolean;
}

export interface TextFieldProps extends FormFieldProps {
  type: 'text' | 'email' | 'tel' | 'number';
  helpText?: string;
}

export interface SelectFieldProps extends FormFieldProps {
  options: Array<{ label: string; value: string }>;
}

export interface ProductCardProps {
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  variant?: string;
  showQuantityBadge: boolean;
  hasDiscount: boolean;
  originalPrice?: number;
}

export interface OrderSummaryProps {
  showSubtotal: boolean;
  showShipping: boolean;
  showDiscount: boolean;
  showTotal: boolean;
  showDiscountInput: boolean;
  currencySymbol: string;
}

export interface ShippingSelectorProps {
  title: string;
  methods: ShippingMethod[];
}

export interface PaymentSelectorProps {
  showCard: boolean;
  showPayPal: boolean;
  cardLabel: string;
  paypalLabel: string;
}

export interface UpsellCardProps {
  productImage: string;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountBadge: string;
  addButtonText: string;
  description: string;
  urgencyEnabled: boolean;
  urgencyText: string;
  urgencySeconds: number;
}

export interface OrderBumpProps {
  productImage: string;
  productName: string;
  price: number;
  originalPrice: number;
  description: string;
  checkboxLabel: string;
  highlighted: boolean;
  highlightColor: string;
}

export interface HeaderProps {
  logoUrl: string;
  logoAlt: string;
  logoMaxHeight: string;
  logoAlignment: 'left' | 'center' | 'right';
  backgroundColor: string;
}

export interface SubmitButtonProps {
  text: string;
  showLockIcon: boolean;
  showAmount: boolean;
  backgroundColor: string;
  textColor: string;
  fullWidth: boolean;
}

export interface TrustBadge {
  type: 'ssl' | 'guarantee' | 'shipping' | 'support';
  text: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  alignment: 'left' | 'center' | 'right';
  size: 'small' | 'medium' | 'large';
}
