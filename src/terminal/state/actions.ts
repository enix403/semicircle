import { Item } from "types/protos-ts/offerings_pb";
import { CompositeQuantity, QuantityM, UnitInfoM } from "types/quantification";
import type { CartItemEntry, StoreSetter } from "./store";

export function addToCart(item: Item, set: StoreSetter) {
  // TODO: maybe handle duplicate offerings

  set(({ cart }) => {
    let existing = cart.items.find(itEntry => itEntry.offering.id == item.id);
    if (existing) {
      existing.offQty.qty.majorUnits++;
      return;
    }

    const unitInfo = UnitInfoM.fromCode(item.unitCode);

    let newCartItem: CartItemEntry = {
      offering: item,
      offQty: {
        qty: QuantityM.createC(1),
        unitInfo
      }
    };

    cart.items.push(newCartItem);
  });
}

export function updateEntryQuantity(
  item: Item,
  newQty: CompositeQuantity,
  removeIfZero: boolean,
  set: StoreSetter
) {
  set(({ cart }) => {
    let targetIndex = cart.items.findIndex(ent => ent.offering.id == item.id);
    if (targetIndex !== -1) {
      let target = cart.items[targetIndex];
      target.offQty.qty = newQty;
      QuantityM.simplifyC(target.offQty);
      if (removeIfZero && QuantityM.isZeroC(target.offQty.qty)) {
        // remove from cart altogether
        cart.items.splice(targetIndex, 1);
      }
    }
  });
}
