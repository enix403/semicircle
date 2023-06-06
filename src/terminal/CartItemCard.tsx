import cx from "classnames";
import React from "react";

import { Button, Input, InputGroup, InputRightAddon, Stack } from "@chakra-ui/react";
import { Eye } from "@phosphor-icons/react";

import {
  CompleteCompositeQuantity,
  CompositeQuantity,
  QuantityM,
  UnitInfoM
} from "types/quantification";
import { roundToMultipleDown, roundToMultipleUp } from "utils";
import { numformat } from "./common";
import { CartItemEntry, useTerminalStore } from "./state/store";

import { FlexGrow } from "components/FlexGrow/FlexGrow";
import "./CartItemCard.css";

interface QuantityPickerProps {
  qty: CompleteCompositeQuantity;
  onChange?: (newQty: CompositeQuantity) => void;
}
const QuantityPicker = (props: QuantityPickerProps) => {
  const { qty: ccq, onChange } = props;
  // console.log("QuantityPicker", ccq.qty.majorUnits)
  let unitInfo = ccq.unitInfo;
  let fractional = !UnitInfoM.isCountable(unitInfo);

  let widthClass = fractional ? "w-56" : "w-28";

  return (
    <div className={cx("alt-font-1 mr-3 min-w-[5rem] font-medium", widthClass)}>
      <Stack direction='row'>
        <InputGroup size='sm'>
          <Input
            className='text-right'
            type='number'
            min={0}
            value={ccq.qty.majorUnits.toString()}
            onChange={e => {
              onChange?.({
                ...ccq.qty,
                majorUnits: +e.target.value || 0
              });
            }}
            onFocus={e => e.target.select()}
          />
          <InputRightAddon children={unitInfo.majorShortName} />
        </InputGroup>
        {fractional && (
          <InputGroup size='sm'>
            <Input
              className='text-right'
              type='number'
              min={1}
              value={ccq.qty.minorUnits.toString()}
              onChange={e => {
                onChange?.({
                  ...ccq.qty,
                  minorUnits: +e.target.value || 0
                });
              }}
              onFocus={e => e.target.select()}
              onKeyDown={e => {
                if (e.key == "ArrowUp") {
                  onChange?.({
                    ...ccq.qty,
                    minorUnits: roundToMultipleUp(ccq.qty.minorUnits, unitInfo.naturalInterval)
                  });
                  e.preventDefault();
                } else if (e.key == "ArrowDown") {
                  onChange?.({
                    ...ccq.qty,
                    minorUnits: roundToMultipleDown(ccq.qty.minorUnits, unitInfo.naturalInterval)
                  });
                  e.preventDefault();
                }
              }}
            />
            <InputRightAddon children={unitInfo.minorShortName} />
          </InputGroup>
        )}
      </Stack>
    </div>
  );
};

interface SubtotalProps {
  qty: CompleteCompositeQuantity;
  price: number;
}
const Subtotal = ({ qty: ccq, price }: SubtotalProps) => {
  let qtyValue = QuantityM.numericValueC(ccq);
  let subtotal = qtyValue * price;

  let qtyRendered = UnitInfoM.isCountable(ccq.unitInfo) ? qtyValue.toString() : numformat(qtyValue);

  return (
    <div className='alt-font-1 mr-3 w-36 flex-shrink-0 border-l-2 border-gray-200 text-right text-sm font-medium'>
      <p>
        <span className='text-base text-blue-700'>{qtyRendered}</span>
        <span className='text-xs text-slate-700'>
          {" "}
          {ccq.unitInfo.majorShortName} x {price}
        </span>
      </p>
      <p>
        = <span className='text-lg text-yellow-600'>{numformat(subtotal)}</span>
      </p>
    </div>
  );
};

interface CartItemCardProps {
  itemEntry: CartItemEntry;
}
export const CartItemCard = React.memo(
  ({ itemEntry }: CartItemCardProps) => {
    const item = itemEntry.offering;

    const [expanded, setExpanded] = React.useState(false);

    const removeEntry = useTerminalStore(store => store.removeEntry);
    const updateEntryQuantity = useTerminalStore(store => store.updateEntryQuantity);
    const changeQtyBy = (majorDelta: number) => {
      let old = itemEntry.offQty.qty;
      updateEntryQuantity(itemEntry.offering, {
        ...old,
        majorUnits: Math.max(0, old.majorUnits + majorDelta)
      });
    };

    const isZero = QuantityM.isZeroC(itemEntry.offQty.qty);

    return (
      <div
        className={cx(
          "group mt-4 overflow-hidden rounded-md border-2 bg-white shadow-lg transition-all first:mt-0",
          isZero ? "invalid border border-red-500 shadow-2xl shadow-red-400" : "border-blue-500",
          expanded && "expanded"
        )}
        title={item.name}
      >
        <div className='flex h-16 items-center border-b group-[.expanded]:border-blue-300'>
          <div
            className='box-center cart-entry-del-btn'
            onClick={() => {
              setExpanded(!expanded); // toggle expanded
            }}
          >
            <Eye weight='regular' size='2.012rem' />
          </div>
          <div className='flex-grow overflow-x-hidden text-ellipsis whitespace-nowrap pl-3 text-base font-medium group-[.invalid]:text-red-500'>
            {item.name}
          </div>
          <QuantityPicker
            qty={itemEntry.offQty}
            onChange={newQty => {
              updateEntryQuantity(itemEntry.offering, newQty);
            }}
          />
          <Subtotal qty={itemEntry.offQty} price={item.price} />
        </div>
        {expanded && (
          <div className='flex px-2 py-2'>
            <Button onClick={() => changeQtyBy(1)} colorScheme='whatsapp' className='mr-2'>
              <span className='text-3xl font-light'>+</span>
            </Button>
            <Button onClick={() => changeQtyBy(-1)} colorScheme='twitter' className='mr-2'>
              <span className='text-3xl font-light'>-</span>
            </Button>
            <FlexGrow />
            <Button
              colorScheme='red'
              onClick={() => {
                removeEntry(itemEntry.offering);
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    );
  },

  // only re render when it's own quantity changes
  (prevProps, newProps) =>
    QuantityM.compareC(prevProps.itemEntry.offQty.qty, newProps.itemEntry.offQty.qty)
);
