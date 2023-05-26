import { POSTerminal } from "terminal/POSTerminal";

import './repositories/index';

import { Item, ItemList, ItemsQuery } from 'types/protos-ts/offerings_pb';

(window as any).Item = Item;
(window as any).ItemList = ItemList;
(window as any).ItemsQuery = ItemsQuery;

const App = POSTerminal;

export default App;