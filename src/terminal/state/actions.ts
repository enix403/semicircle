// import { AnyOffering, makeAnyOfferingId } from "types";
import { Item } from "types/protos-ts/offerings_pb";
import { CompositeQuantity, QuantityM, UnitInfo, UnitInfoM } from "types/quantification";
import { assertUnreachable } from "utils";
import type { CartEntry, CartItemEntry, StoreSetter } from "./store";

export function addToCart(item: Item, set: StoreSetter) {
  // let offId = makeAnyOfferingId(offering);

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

/*
export function deleteFromCart(offId: string, set: StoreSetter) {
  set(store => {
    let index = store.cart.findIndex(off => off.offeringId == offId);
    if (index != -1) {
      store.cart.splice(index, 1);
    }

    // Re-create indexes
    for (let i = 0; i < store.cart.length; ++i) {
      store.cart[i].index = i;
    }
  });
}
 */
