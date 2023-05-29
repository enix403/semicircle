import { AnyOffering } from "types";
import { Item } from "types/protos-ts/offerings_pb";
import type { CartEntry, TerminalStore } from "./store";

export const useCartEntryIds = (store: TerminalStore) =>
  store.cart.map(entry => entry.offeringId);
