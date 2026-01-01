import { useCheckoutStore } from '../store/checkoutStore';

export function useCart() {
  const items = useCheckoutStore((state) => state.items);
  const addItem = useCheckoutStore((state) => state.addItem);
  const removeItem = useCheckoutStore((state) => state.removeItem);
  const updateQuantity = useCheckoutStore((state) => state.updateQuantity);
  const clearCart = useCheckoutStore((state) => state.clearCart);
  const getSubtotal = useCheckoutStore((state) => state.getSubtotal);
  const getTotal = useCheckoutStore((state) => state.getTotal);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getSubtotal();
  const total = getTotal();

  return {
    items,
    itemCount,
    subtotal,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isEmpty: items.length === 0,
  };
}
