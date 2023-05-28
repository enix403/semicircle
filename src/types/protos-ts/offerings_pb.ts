/* eslint-disable */
// @generated by protobuf-ts 2.9.0 with parameter long_type_string,generate_dependencies,optimize_code_size,ts_nocheck,eslint_disable,add_pb_suffix
// @generated from protobuf file "offerings.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message Item
 */
export interface Item {
    /**
     * @generated from protobuf field: uint64 id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string app_code = 3;
     */
    appCode: string;
    /**
     * @generated from protobuf field: string bar_code = 4;
     */
    barCode: string;
    /**
     * @generated from protobuf field: string bar_code_std = 5;
     */
    barCodeStd: string;
    /**
     * @generated from protobuf field: string kind = 6;
     */
    kind: string;
    /**
     * @generated from protobuf field: string unit_code = 7;
     */
    unitCode: string;
    /**
     * @generated from protobuf field: double price = 8;
     */
    price: number;
    /**
     * @generated from protobuf field: bool open_for_sale = 9;
     */
    openForSale: boolean;
    /**
     * @generated from protobuf field: bool active = 10;
     */
    active: boolean;
}
/**
 * @generated from protobuf message ItemList
 */
export interface ItemList {
    /**
     * @generated from protobuf field: repeated Item items = 1;
     */
    items: Item[];
}
/**
 * @generated from protobuf message QueryItems
 */
export interface QueryItems {
    /**
     * @generated from protobuf field: optional ItemList _SQ_Ret = 1601;
     */
    SQRet?: ItemList;
    /**
     * @generated from protobuf field: optional bool include_inactive = 1;
     */
    includeInactive?: boolean;
    /**
     * @generated from protobuf field: optional string kind = 2;
     */
    kind?: string;
    /**
     * @generated from protobuf field: optional bool include_not_open_for_sale = 3;
     */
    includeNotOpenForSale?: boolean;
}
/**
 * @generated from protobuf message CmdCreateItem
 */
export interface CmdCreateItem {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * @generated from protobuf field: string app_code = 2;
     */
    appCode: string;
    /**
     * @generated from protobuf field: string bar_code = 3;
     */
    barCode: string;
    /**
     * @generated from protobuf field: string bar_code_std = 4;
     */
    barCodeStd: string;
    /**
     * @generated from protobuf field: string kind = 5;
     */
    kind: string;
    /**
     * @generated from protobuf field: string unit_code = 6;
     */
    unitCode: string;
    /**
     * @generated from protobuf field: double price = 7;
     */
    price: number;
    /**
     * @generated from protobuf field: bool open_for_sale = 8;
     */
    openForSale: boolean;
}
// @generated message type with reflection information, may provide speed optimized methods
class Item$Type extends MessageType<Item> {
    constructor() {
        super("Item", [
            { no: 1, name: "id", kind: "scalar", T: 4 /*ScalarType.UINT64*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "app_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "bar_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "bar_code_std", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "kind", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "unit_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "price", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 9, name: "open_for_sale", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message Item
 */
export const Item = new Item$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ItemList$Type extends MessageType<ItemList> {
    constructor() {
        super("ItemList", [
            { no: 1, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Item }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message ItemList
 */
export const ItemList = new ItemList$Type();
// @generated message type with reflection information, may provide speed optimized methods
class QueryItems$Type extends MessageType<QueryItems> {
    constructor() {
        super("QueryItems", [
            { no: 1601, name: "_SQ_Ret", kind: "message", T: () => ItemList },
            { no: 1, name: "include_inactive", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "kind", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "include_not_open_for_sale", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message QueryItems
 */
export const QueryItems = new QueryItems$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CmdCreateItem$Type extends MessageType<CmdCreateItem> {
    constructor() {
        super("CmdCreateItem", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "app_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "bar_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "bar_code_std", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "kind", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "unit_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "price", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 8, name: "open_for_sale", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message CmdCreateItem
 */
export const CmdCreateItem = new CmdCreateItem$Type();