import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Stack
} from "@chakra-ui/react";
import { Eye } from "@phosphor-icons/react";

import React from "react";
import "./CartItemCard.css";

import classNames from "classnames";
import {
  CompleteCompositeQuantity,
  CompositeQuantity,
  QuantityM,
  UnitInfoM
} from "types/quantification";
import { CartItemEntry, useTerminalStore } from "./state/store";

import { roundToMultipleDown, roundToMultipleUp } from "utils";
import { numformat } from "./common";

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
    <div
      className={classNames(
        "alt-font-1 mr-3 min-w-[5rem] font-medium",
        widthClass
      )}
    >
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
                    minorUnits: roundToMultipleUp(
                      ccq.qty.minorUnits,
                      unitInfo.naturalInterval
                    )
                  });
                  e.preventDefault();
                } else if (e.key == "ArrowDown") {
                  onChange?.({
                    ...ccq.qty,
                    minorUnits: roundToMultipleDown(
                      ccq.qty.minorUnits,
                      unitInfo.naturalInterval
                    )
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

  let qtyRendered = UnitInfoM.isCountable(ccq.unitInfo)
    ? qtyValue.toString()
    : numformat(qtyValue);

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

    const updateEntryQuantity = useTerminalStore(
      store => store.updateEntryQuantity
    );

    const zeroQty = QuantityM.isZeroC(itemEntry.offQty.qty);

    return (
      <div
        className={classNames(
          "mt-4 flex h-16 items-center rounded-md border-2 bg-white shadow-lg transition-all first:mt-0 slide-in-blurred-top",
          zeroQty
            ? "border-4 border-red-500 shadow-2xl shadow-red-400"
            : "border-blue-500"
        )}
        title={item.name}
      >
        <div className='del-btn box-center aspect-square min-h-full cursor-pointer self-stretch bg-blue-500/20 text-blue-500 hover:bg-blue-500/30'>
          <Eye weight='regular' size='2.012rem' />
        </div>
        <div className='flex-grow overflow-x-hidden text-ellipsis whitespace-nowrap pl-3 text-base font-medium'>
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
    );
  },

  // only re render when it's own quantity changes
  (prevProps, newProps) =>
    QuantityM.compareC(
      prevProps.itemEntry.offQty.qty,
      newProps.itemEntry.offQty.qty
    )
);
