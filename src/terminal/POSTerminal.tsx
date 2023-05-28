import { ReactElement, useEffect } from "react";
import { OfferingCard } from "./OfferingCard";
import { CartEntry, useTerminalStore } from "./state/store";

import { callProtoService } from "repositories";

import { Item, QueryItems } from "types/protos-ts/offerings_pb";
import { CartItemCard } from "./CartItemCard";
import "./terminal-global.css";

function makeGroups<T>(list: T[], len: number): T[][] {
  let result: T[][] = [];

  let current: T[] = [];

  let c;
  for (let i = 0, c = 0; i < list.length; ++i, ++c) {
    if (c == len) {
      c = 0;
      result.push(current);
      current = [];
    }
    current.push(list[i]);
  }
  if (c != len) result.push(current);

  return result;
}

function OfferingsPane(): ReactElement {
  const { allItems } = useTerminalStore(store => store.offerings);

  return (
    <div className='flex-[1.5] overflow-y-auto p-4'>
      {makeGroups(allItems, 5).map((itemsRow, index) => (
        <div className='flex flex-row' key={index}>
          {itemsRow.map(item => (
            <OfferingCard key={item.id} retail_item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function POSTerminal(): ReactElement {
  const updateOfferings = useTerminalStore(store => store.updateOfferings);

  const addToCart = useTerminalStore(store => store.addToCart);
  const clearCart = useTerminalStore(store => store.clearCart);

  const cart = useTerminalStore(store => store.cart);

  useEffect(() => {
    (async function () {
      let result = await callProtoService(QueryItems);

      if (result === null) {
        console.log("Error Effect");
        return;
      }

      updateOfferings({
        allItems: result.items
        // allServices: []
      });

      clearCart();
      addToCart({ kind: "retail_item", item: result.items[3] });
      addToCart({ kind: "retail_item", item: result.items[6] });
      addToCart({ kind: "retail_item", item: result.items[2] });

    })();
  }, []);


  let cartItems = cart.reduce((filtered, entry) => {
    if (entry.offering.kind == "retail_item")
      filtered.push({
        ...entry,
        offering: entry.offering.item
      });

    return filtered;
  }, [] as CartEntry<Item>[]);

  return (
    <>
      <div className='flex max-h-full overflow-hidden'>
        <OfferingsPane />
        <div className='flex-1 overflow-y-auto border-2 border-l-zinc-300 bg-slate-100 p-5'>
          {cartItems.map(entry => (
            <CartItemCard key={entry.offeringId} itemEntry={entry} />
          ))}
        </div>
      </div>
    </>
  );
}
