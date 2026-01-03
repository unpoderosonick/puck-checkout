import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  isUpsell?: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface CheckoutStore {
  // Cart
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  // Shipping
  shippingMethods: ShippingMethod[];
  selectedShipping: string;
  setShippingMethods: (methods: ShippingMethod[]) => void;
  setSelectedShipping: (id: string) => void;

  // Discount
  discountCode: string;
  discountAmount: number;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;

  // Tip
  tipAmount: number;
  setTipAmount: (amount: number) => void;

  // Form data
  formData: Record<string, string>;
  setFormField: (field: string, value: string) => void;
  setFormData: (data: Record<string, string>) => void;

  // Upsell flow
  currentOffer: 'none' | 'upsell' | 'downsell' | 'complete';
  acceptedOffers: string[];
  setCurrentOffer: (offer: 'none' | 'upsell' | 'downsell' | 'complete') => void;
  acceptOffer: (offerId: string) => void;
  declineOffer: () => void;

  // Computed values
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

// Mock discount codes
const validDiscounts: Record<string, number> = {
  'SAVE10': 10,
  'SAVE20': 20,
  'WELCOME15': 15,
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  // Cart
  items: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 149.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80?text=Headphones',
      variant: 'Black',
    },
  ],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    })),
  clearCart: () => set({ items: [] }),

  // Shipping
  shippingMethods: [
    { id: 'standard', name: 'Secure Standard Shipping', price: 4.95, estimatedDays: '' },
    { id: 'express', name: 'Fast Shipping + Insurance + Tracking', price: 7.95, estimatedDays: '' },
  ],
  selectedShipping: 'standard',
  setShippingMethods: (methods) => set({ shippingMethods: methods }),
  setSelectedShipping: (id) => set({ selectedShipping: id }),

  // Discount
  discountCode: '',
  discountAmount: 0,
  applyDiscount: (code) => {
    const upperCode = code.toUpperCase();
    if (validDiscounts[upperCode]) {
      set({
        discountCode: upperCode,
        discountAmount: validDiscounts[upperCode],
      });
      return true;
    }
    return false;
  },
  removeDiscount: () => set({ discountCode: '', discountAmount: 0 }),

  // Tip
  tipAmount: 0,
  setTipAmount: (amount) => set({ tipAmount: amount }),

  // Form data
  formData: {},
  setFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  setFormData: (data) => set({ formData: data }),

  // Upsell flow
  currentOffer: 'none',
  acceptedOffers: [],
  setCurrentOffer: (offer) => set({ currentOffer: offer }),
  acceptOffer: (offerId) =>
    set((state) => ({
      acceptedOffers: [...state.acceptedOffers, offerId],
      currentOffer: 'complete',
    })),
  declineOffer: () =>
    set((state) => ({
      currentOffer: state.currentOffer === 'upsell' ? 'downsell' : 'complete',
    })),

  // Computed values
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  getShippingCost: () => {
    const { shippingMethods, selectedShipping } = get();
    const method = shippingMethods.find((m) => m.id === selectedShipping);
    return method?.price || 0;
  },
  getTotal: () => {
    const { discountAmount, tipAmount, getSubtotal, getShippingCost } = get();
    const subtotal = getSubtotal();
    const discount = (subtotal * discountAmount) / 100;
    return subtotal - discount + getShippingCost() + tipAmount;
  },
}));
