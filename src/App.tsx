import { POSTerminal } from "terminal/POSTerminal";

import "./repositories/index";
import "./types/quantification";

import { CmdCreateItem, Item, ItemList, QueryItems } from "types/protos-ts/offerings_pb";

(window as any).Item = Item;
(window as any).ItemList = ItemList;
(window as any).QueryItems = QueryItems;
(window as any).CmdCreateItem = CmdCreateItem;

const App = POSTerminal;

export default App;
