import { ReactElement, useEffect, useRef } from "react";

import { FlexGrow } from "components/FlexGrow/FlexGrow";
import { callProtoService } from "repositories";
import { QueryItems } from "types/protos-ts/offerings_pb";
import { QuantityM } from "types/quantification";
import { CartView } from './CartView';
import { OfferingsPane } from './OfferingsPane';
import { numformat } from "./common";
import { useTerminalStore } from "./state/store";

import "./terminal-global.css";

interface StatBlockProps {
  name: string;
  value: string | number;
}
function StatBlock(props: StatBlockProps) {
  return (
    <div className='border-2s mx-2 inline-block w-52 border-red-800 text-white'>
      <p className='text-sm font-bold uppercase'>{props.name}</p>
      <p className='alt-font-1 mt-1 text-2xl font-medium text-amber-300'>{props.value}</p>
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
    <div className='flex border-t-8 border-cyan-900 bg-cyan-800 px-4 py-4 anim-stat-block'>
      <StatBlock name='Item Count' value={items.length} />
      <StatBlock name='Total Bill' value={numformat(totalBill)} />
      <FlexGrow />
      <div
        className='
          box-center ml-4 cursor-pointer rounded-md border-2 border-green-300 px-3
          font-semibold text-green-300 hover:bg-green-300/80 hover:text-black
          h-14
        '
      >
        Checkout
      </div>
    </div>
  );
}

export function POSTerminal(): ReactElement {
  const updateOfferings = useTerminalStore(store => store.updateOfferings);

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
    })();
  }, []);

  return (
    <>
      <div className='flex h-full max-h-full overflow-hidden'>
        <div className='flex flex-[1.5] flex-col'>
          <OfferingsPane />
          <Stats />
        </div>
        <div className='flex flex-1 flex-col border-l-2 border-zinc-300 bg-slate-100'>
          <CartView />
        </div>
      </div>
    </>
  );
}
