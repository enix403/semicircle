import { assertUnreachable } from "utils";
import { Item } from "./protos-ts/offerings_pb";

export type AnyOffering =
  | { kind: "retail_item"; item: Item }
  | { kind: "service"; service: number };

export function makeAnyOfferingId(off: AnyOffering): string {
  switch (off.kind) {
    case "retail_item":
      return `itm-#${off.item.id}`;
    case "service":
      return `srv-#${off.service}`;
    default:
      assertUnreachable(off);
  }
}

/* ================= */
