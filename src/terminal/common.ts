import { format } from "d3-format";
import { CompleteCompositeQuantity, QuantityM } from "types/quantification";

// [​[fill]align] [sign] [symbol] [0] [width] [,] [.precision] [~] [type]
export const numformat = format(",.2~f");

export function useSubtotal(ccq: CompleteCompositeQuantity, price: number) {
  let qtyValue = QuantityM.numericValueC(ccq);
  let subtotal = numformat(qtyValue * price);
  let qty = numformat(qtyValue);

  return { subtotal, qty };
}
