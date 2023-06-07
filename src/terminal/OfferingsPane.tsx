import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";

import { OfferingCard } from "./OfferingCard";
import { useTerminalStore } from "./state/store";

export function OfferingsPane() {
  const { allItems } = useTerminalStore(store => store.offerings);

  return (
    <div className='h-full py-4'>
      <AutoSizer>
        {(size: Size) => {
          let COLUMNS = 5;
          if (size.width <= 940) COLUMNS = 4;

          const ROWS = Math.ceil(allItems.length / COLUMNS);

          const getItem = (row: number, column: number) => allItems[row * COLUMNS + column];

          return (
            <FixedSizeGrid
              columnCount={COLUMNS}
              columnWidth={size.width / COLUMNS}
              rowCount={ROWS}
              rowHeight={160}
              height={size.height}
              width={size.width}
              itemKey={({ columnIndex, rowIndex }) => getItem(rowIndex, columnIndex).id}
              overscanRowCount={4}
              className='override-pointer-events'
            >
              {({ columnIndex, rowIndex, style }) => (
                <div className='px-2 pt-2' style={style}>
                  <OfferingCard item={getItem(rowIndex, columnIndex)} />
                </div>
              )}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>
    </div>
  );
}