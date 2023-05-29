import { AnyOffering, makeAnyOfferingId } from "types";
import {
  CompositeQuantity,
  QuantityM,
  UnitInfo,
  UnitInfoM
} from "types/quantification";
import { assertUnreachable } from "utils";
import type { CartEntry, StoreSetter } from "./store";

export function addToCart(offering: AnyOffering, set: StoreSetter) {
  let offId = makeAnyOfferingId(offering);

  // TODO: maybe handle duplicate offerings

  set(store => {
    let existing = store.cart.find(entry => entry.offeringId == offId);
    if (existing) {

      existing.quantityCC.qty.majorUnits ++;
      return;
    }

    let unitInfo: UnitInfo;
    switch (offering.kind) {
      case "retail_item": {
        unitInfo = UnitInfoM.fromCode(offering.item.unitCode);
        break;
      }
      case "service": {
        unitInfo = UnitInfoM.fromCode("pc");
        break;
      }
      default:
        assertUnreachable(offering);
    }

    let newCartItem: CartEntry = {
      index: store.cart.length,
      offeringId: offId,
      offering: offering,
      quantityCC: {
        qty: QuantityM.createC(1),
        unitInfo
      }
    };

    store.cart.push(newCartItem);
  });
}

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
