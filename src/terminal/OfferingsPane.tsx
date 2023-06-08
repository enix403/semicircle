import React from "react";

import { OfferingCard } from "./OfferingCard";
import { useTerminalStore } from "./state/store";

const PAGE_SIZE = 25;

const PaginationButton = (props: React.PropsWithChildren<{ onClick: () => void }>) => (
  <div
    onClick={props.onClick}
    className='inline-flex h-full w-1/2 items-center justify-center bg-orange-600 transition-colors hover:bg-orange-800'
  >
    {props.children}
  </div>
);

export const OfferingsPane = React.memo(() => {
  const { allItems } = useTerminalStore(store => store.offerings);
  const [page, setPage] = React.useState(0);

  let base = Math.max(0, page) * PAGE_SIZE;
  let last = Math.ceil(allItems.length / PAGE_SIZE) - 1;
  const slicedItems = allItems.slice(base, base + PAGE_SIZE);

  const deltaPage = React.useCallback(
    (delta: number) => {
      setPage(p => clamp(0, last, p + delta));
    },
    [last]
  );

  return (
    <>
      <div className='flex h-full flex-wrap content-start overflow-y-auto p-4'>
        {slicedItems.map(item => (
          <div key={item.id} className='h-40 w-1/5 px-2 pt-2'>
            <OfferingCard item={item} />
          </div>
        ))}
      </div>
      <div className='h-12 cursor-pointer text-3xl font-bold text-white'>
        <PaginationButton onClick={() => deltaPage(-1)}>&lt;</PaginationButton>
        <PaginationButton onClick={() => deltaPage(+1)}>&gt;</PaginationButton>
      </div>
    </>
  );
});

function clamp(min: number, max: number, value: number): number {
  if (value < min) return min;
  if (value > max) return max;

  return value;
}
