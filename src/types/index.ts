export type AppTheme =
  | 'light'
  | 'dark';

/* ================= */
export interface RetailItem {
  id: number;

  name: string;
  price: number;
}

export interface Service {
  id: number;
  name: string;
}

export type AnyOffering =
  | { kind: "retail_item"; item: RetailItem }
  | { kind: "service"; service: Service };


/* ================= */