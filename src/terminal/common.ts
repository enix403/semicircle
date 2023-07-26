import { format } from "d3-format";
import { CompleteCompositeQuantity, QuantityM } from "types/quantification";
import { TerminalStore } from "./state/store";

// [​[fill]align] [sign] [symbol] [0] [width] [,] [.precision] [~] [type]
export const numformat = format(",.2~f");

export function useSubtotal(ccq: CompleteCompositeQuantity, price: number) {
  let qtyValue = QuantityM.numericValueC(ccq);
  let subtotal = numformat(qtyValue * price);
  let qty = numformat(qtyValue);

  return { subtotal, qty };
}

export function useTotalBill(store: TerminalStore) {
  return store.cart.items.reduce((total, item) => {
    let qtyValue = QuantityM.numericValueC(item.offQty);
    let subtotal = item.offering.price * qtyValue;
    return total + subtotal;
  }, 0);
}