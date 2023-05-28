import { useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import type { AnyOffering } from "types";
import { Item } from "types/protos-ts/offerings_pb";
import { CompleteCompositeQuantity } from "types/quantification";

import * as actions from "./actions";

type Offerings = {
  allItems: Item[];
  // allServices: Service[];
};

export type CartEntry<T = AnyOffering> = {
  offeringId: string;
  offering: T;
  quantityCC: CompleteCompositeQuantity;
};

export interface TerminalState {
  offerings: Offerings;
  cart: CartEntry[];
}

export type StoreSetCallback = (store: TerminalStore) => void;
export type StoreSetter = (callback: StoreSetCallback) => void;

export interface TerminalActions {
  updateOfferings: (updated: TerminalState["offerings"]) => void;
  addToCart: (offering: AnyOffering) => void;
  deleteFromCart: (offId: string) => void;
  clearCart: () => void;

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
        cart: [],
        counter: 0,

        // actions

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
            store.cart = [];
          });
        },
        addToCart: off => actions.addToCart(off, set),
        deleteFromCart: offId => actions.deleteFromCart(offId, set)
      }),
      { name: "pos-terminal-store" }
    )
  )
);

export const useTerminalStore = <T>(selector: (store: TerminalStore) => T) =>
  useStore(terminalStore, selector);

export declare const gstore: TerminalStore;
if (typeof (window as any)["gstore"] === "undefined")
  Object.defineProperty(window, "gstore", {
    get: function () {
      return terminalStore.getState();
    }
  });
