import { useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import { Item } from "types/protos-ts/offerings_pb";
import { CompleteCompositeQuantity, CompositeQuantity, QuantityM } from "types/quantification";

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

export const enum Stage {
  Idle,
  Checkout,
  PostCheckout
}

export interface TerminalState {
  offerings: Offerings;
  cart: {
    items: CartItemEntry[];
    // services: CartServiceEntry[],
  };

  stage: Stage;
}

export type StoreSetCallback = (store: TerminalStore) => void;
export type StoreSetter = (callback: StoreSetCallback) => void;

export interface TerminalActions {
  updateOfferings: (updated: TerminalState["offerings"]) => void;
  clearCart: () => void;
  addToCart: (item: Item) => void;

  updateEntryQuantity: (item: Item, newQty: CompositeQuantity, removeIfZero?: boolean) => void;

  removeEntry: (item: Item) => void;

  setStage: (stage: Stage) => void;

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
          items: []
          // services: []
        },

        stage: Stage.Idle,

        /* actions */
        mutate: callback => {
          set(callback);
        },

        updateOfferings: updated =>
          set((state: TerminalStore) => {
            state.offerings.allItems = updated.allItems;
            // state.offerings.allServices = offering.allServices;
            state.cart.items = []; // clear cart too
          }),

        clearCart: () => {
          set(store => {
            store.cart.items = [];
          });
        },

        addToCart: off => actions.addToCart(off, set),

        updateEntryQuantity: (item, newQty, removeIfZero) =>
          actions.updateEntryQuantity(item, newQty, removeIfZero || false, set),

        removeEntry: item => actions.updateEntryQuantity(item, QuantityM.zeroC, true, set),

        setStage: (stage: Stage) =>
          set(store => {
            store.stage = stage;
          })
      }),
      { name: "pos-terminal-store" }
    )
  )
);

export const useTerminalStore = <T>(
  selector: (store: TerminalStore) => T,
  equalityFn?: (a: T, b: T) => boolean
) => useStore(terminalStore, selector, equalityFn);

export declare const gstore: TerminalStore;
if (typeof (window as any)["gstore"] === "undefined") {
  Object.defineProperty(window, "gstore", {
    get: function () {
      return terminalStore.getState();
    }
  });
}
