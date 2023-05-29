import { useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import { Item } from "types/protos-ts/offerings_pb";
import {
  CompleteCompositeQuantity,
  CompositeQuantity
} from "types/quantification";

import * as actions from "./actions";

type Offerings = {
  allItems: Item[];
  // allServices: Service[];
};

export type CartEntry<T, QtyType> = {
  offering: T;
  offQty: QtyType;
};
export type CartItemEntry = CartEntry<Item, CompleteCompositeQuantity>;
// export type CartServiceEntry = CartEntry<Service, number>;

export interface TerminalState {
  offerings: Offerings;
  cart: {
    items: CartItemEntry[],
    // services: CartServiceEntry[],
  }
}

export type StoreSetCallback = (store: TerminalStore) => void;
export type StoreSetter = (callback: StoreSetCallback) => void;

export interface TerminalActions {
  updateOfferings: (updated: TerminalState["offerings"]) => void;
  addToCart: (item: Item) => void;
  // deleteFromCart: (offId: string) => void;
  clearCart: () => void;

  updateEntryQuantity: (item: Item, newQty: CompositeQuantity) => void;

  //
  mutate: (callback: StoreSetCallback) => void;
}

export type TerminalStore = TerminalState & TerminalActions;

export const terminalStore = createStore<
  TerminalStore,
  [["zustand/immer", never], ["zustand/devtools", never]]
>(
  immer(
    devtools(
      set => ({
        // state
        offerings: {
          allItems: []
          // allServices: []
        },
        cart: {
          items: [],
          // services: []
        },

        /* actions */
        mutate: callback => {
          set(callback);
        },

        updateOfferings: updated =>
          set((state: TerminalStore) => {
            state.offerings.allItems = updated.allItems;
            // state.offerings.allServices = offering.allServices;
          }),

        clearCart: () => {
          set(store => {
            store.cart.items = [];
          });
        },
        addToCart: off => actions.addToCart(off, set),
        // deleteFromCart: offId => actions.deleteFromCart(offId, set),
        updateEntryQuantity: (item: Item, newQty) =>
          set(store => {
            let target = store.cart.items.find(ent => ent.offering.id == item.id);
            if (target) target.offQty.qty = newQty;
          })
      }),
      { name: "pos-terminal-store" }
    )
  )
);

export const useTerminalStore = <T>(selector: (store: TerminalStore) => T) =>
  useStore(terminalStore, selector);

export declare const gstore: TerminalStore;
if (typeof (window as any)["gstore"] === "undefined") {
  Object.defineProperty(window, "gstore", {
    get: function () {
      return terminalStore.getState();
    }
  });
}
