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
      offeringId: offId,
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
    let index = store.cart.findIndex(off => off.offeringId == offId);
    if (index != -1) {
      store.cart.splice(index, 1);
    }
  });
}

