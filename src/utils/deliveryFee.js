// utils/deliveryFee.js
//
// Settings.deliveryFee is an Int. This helper treats it as WHOLE EUROS, the same unit as dish prices
// (a fee of 5 means €5.00). If your Settings page stores it in CENTS (500 = €5.00), change FEE_DIVIDER to 100.
// Everything else in the app reads the fee through this one function.

const FEE_DIVIDER = 1;

export const roundMoney = (value) => Math.round(Number(value || 0) * 100) / 100;

// The fee to charge a delivery order right now: 0 when the fee is switched off or not set
export function getDeliveryFee(settings) {
  if (!settings?.isDeliveryFee) return 0;

  const fee = Number(settings.deliveryFee);
  if (!Number.isFinite(fee) || fee <= 0) return 0;

  return roundMoney(fee / FEE_DIVIDER);
}
