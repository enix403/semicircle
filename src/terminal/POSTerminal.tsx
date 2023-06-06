import { ReactElement, useEffect } from "react";
import { OfferingCard } from "./OfferingCard";
import { useTerminalStore } from "./state/store";

import { callProtoService } from "repositories";

import { QueryItems } from "types/protos-ts/offerings_pb";
import { QuantityM } from "types/quantification";
import { CartItemCard } from "./CartItemCard";
import "./terminal-global.css";

import { Snowflake } from "@phosphor-icons/react";

import { numformat } from "./common";

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
    <div className='overflow-y-auto p-4'>
      {makeGroups(allItems, 5).map((itemsRow, index) => (
        <div className='flex flex-row' key={index}>
          {itemsRow.map(item => (
            <OfferingCard key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

function CartPane() {
  const { items } = useTerminalStore(store => store.cart);
  return (
    <>
      {/* <div className='flex-1 overflow-y-auto p-5'> */}
      {items.map(entry => (
        <CartItemCard key={entry.offering.id} itemEntry={entry} />
      ))}
      {items.length == 0 && (
        <div className='box-center m-2 h-full flex-col'>
          <Snowflake weight='light' size='16rem' />
          <p className='pb-10 text-base'>No items added</p>
        </div>
      )}
      {/* </div> */}
    </>
  );
}

interface StatBlockProps {
  name: string;
  value: string | number;
}
function StatBlock(props: StatBlockProps) {
  return (
    <div className='mx-2 inline-block'>
      <p className='text-center text-sm font-bold uppercase'>{props.name}</p>
      <p className='alt-font-1 mt-1 text-right text-2xl font-medium text-amber-300'>
        {props.value}
      </p>
    </div>
  );
}

function Stats() {
  const items = useTerminalStore(store => store.cart.items);

  const totalBill = items.reduce((total, item) => {
    let qtyValue = QuantityM.numericValueC(item.offQty);
    let subtotal = item.offering.price * qtyValue;
    return total + subtotal;
  }, 0);

  return (
    <div className='flex h-24 border-t-2 border-zinc-300 bg-cyan-800 px-2 py-4 text-white'>
      <div className='box-center flex-1'>
        <StatBlock name='Item Count' value={items.length} />
      </div>
      <div className='box-center flex-1'>
        <StatBlock name='Total Bill' value={numformat(totalBill)} />
      </div>
    </div>
  );
}

export function POSTerminal(): ReactElement {
  const updateOfferings = useTerminalStore(store => store.updateOfferings);
  const addToCart = useTerminalStore(store => store.addToCart);
  const clearCart = useTerminalStore(store => store.clearCart);

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
    })();
  }, []);

  return (
    <>
      <div className='flex h-full max-h-full overflow-hidden'>
        <div className='flex flex-[1.5] flex-col'>
          <OfferingsPane />
          <Stats />
        </div>
        <div className='flex-1 flex-col overflow-y-auto border-l-2 border-zinc-300 bg-slate-100 p-5'>
          <CartPane />
        </div>
      </div>
    </>
  );
}
