import { ReactElement, useEffect } from "react";
import { OfferingCard } from "./OfferingCard";
import { useTerminalStore } from "./state/store";

import { callProtoService } from "repositories";

import { QueryItems } from "types/protos-ts/offerings_pb";
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

export function POSTerminal(): ReactElement {
  const { allItems } = useTerminalStore(store => store.offerings);
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
    <div className='p-4'>
      {makeGroups(allItems, 4).map((itemsRow, index) => (
        <div className='flex flex-row' key={index}>
          {itemsRow.map(item => (
            <OfferingCard key={item.id} retail_item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
