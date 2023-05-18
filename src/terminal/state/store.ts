import { useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import type { AnyOffering, RetailItem, Service } from "types";

type Offerings = {
  allItems: RetailItem[];
  allServices: Service[];
};

type CartItem = {
  offering: AnyOffering;
  quantity: number;
};

export interface TerminalState {
  offerings: Offerings;
  cart: CartItem[];
}

export interface TerminalActions {
  updateOfferings: (updated: TerminalState["offerings"]) => void;
  addToCart: (offering: AnyOffering) => void;
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
          allItems: [],
          allServices: []
        },
        cart: [],
        counter: 0,

        // actions
        updateOfferings: offering =>
          set((state: TerminalStore) => {
            state.offerings.allItems = offering.allItems;
            state.offerings.allServices = offering.allServices;
          }),
        addToCart: _ => {},
      }),
      { name: "pos-terminal-store" }
    )
  )
);

export const useTerminalStore = <T>(
  selector: (store: TerminalStore) => T
) => useStore(terminalStore, selector);
