import type { TerminalStore } from "./store";

export const useCartEntryIds = (store: TerminalStore) =>
  store.cart.map(entry => entry.offeringId);
