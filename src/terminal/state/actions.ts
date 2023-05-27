import { AnyOffering, makeAnyOfferingId } from "types";
import {
  CompositeQuantity,
  QuantityM,
  UnitInfo,
  UnitInfoM
} from "types/quantification";
import { assertUnreachable } from "utils";
import type { CartItem, StoreSetter } from "./store";

export function addToCart(offering: AnyOffering, set: StoreSetter) {
  let offId = makeAnyOfferingId(offering);

  // TODO: maybe handle duplicate offerings

  set(store => {
    let unitInfo: UnitInfo;
    switch (offering.kind) {
      case "retail_item": {
        unitInfo = UnitInfoM.fromCode(offering.item.unitCode);
        break;
      }
      default:
        assertUnreachable(offering.kind);
    }

    let newCartItem: CartItem = {
      cartId: offId,
      offering: offering,
      quantityCC: {
        qty: QuantityM.createC(),
        unitInfo
      }
    };

    store.cart.push(newCartItem);
  });
}

export function deleteFromCart(offId: string, set: StoreSetter) {
  set(store => {
    let index = store.cart.findIndex(off => off.cartId == offId);
    if (index != -1) {
      store.cart.splice(index, 1);
    }
  });
}

