import { Item } from "./protos-ts/offerings_pb";

export type AnyOffering =
  | { kind: "retail_item"; item: Item }
  // | { kind: "service"; service: Service };


/* ================= */