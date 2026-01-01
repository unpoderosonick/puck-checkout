import { useCheckoutStore } from '../store/checkoutStore';
import { useCallback } from 'react';

export function useUpsellFlow() {
  const currentOffer = useCheckoutStore((state) => state.currentOffer);
  const acceptedOffers = useCheckoutStore((state) => state.acceptedOffers);
  const setCurrentOffer = useCheckoutStore((state) => state.setCurrentOffer);
  const acceptOffer = useCheckoutStore((state) => state.acceptOffer);
  const declineOffer = useCheckoutStore((state) => state.declineOffer);
  const addItem = useCheckoutStore((state) => state.addItem);

  const startUpsellFlow = useCallback(() => {
    setCurrentOffer('upsell');
  }, [setCurrentOffer]);

  const handleAccept = useCallback(
    (offerId: string, item?: { id: string; name: string; price: number; image: string }) => {
      if (item) {
        addItem({
          ...item,
          quantity: 1,
          isUpsell: true,
        });
      }
      acceptOffer(offerId);
    },
    [addItem, acceptOffer]
  );

  const handleDecline = useCallback(() => {
    declineOffer();
  }, [declineOffer]);

  const completeFlow = useCallback(() => {
    setCurrentOffer('complete');
  }, [setCurrentOffer]);

  return {
    currentOffer,
    acceptedOffers,
    isShowingUpsell: currentOffer === 'upsell',
    isShowingDownsell: currentOffer === 'downsell',
    isComplete: currentOffer === 'complete',
    startUpsellFlow,
    handleAccept,
    handleDecline,
    completeFlow,
  };
}
