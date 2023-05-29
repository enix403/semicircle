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

import { format } from "d3-format";

import classNames from "classnames";
import { Item } from "types/protos-ts/offerings_pb";
import {
  CompleteCompositeQuantity,
  CompositeQuantity,
  QuantityM,
  UnitInfoM
} from "types/quantification";
import { CartEntry, useTerminalStore } from "./state/store";

const numformat = format(".2f");

const FlexGrow = React.memo((props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        "aspect-square flex-grow self-stretch",
        props.className
      )}
    />
  );
});

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
            className='text-right invalid:text-red'
            type='number'
            min={1}
            value={ccq.qty.majorUnits.toString()}
            onChange={e => {
              onChange?.({
                ...ccq.qty,
                majorUnits: +e.target.value || 0
              });
            }}
          />
          <InputRightAddon children={unitInfo.majorShortName} />
        </InputGroup>
        {fractional && (
          <InputGroup size='sm'>
            <Input
              className='text-right'
              type='number'
              defaultValue={ccq.qty.minorUnits}
            />
            <InputRightAddon children={unitInfo.minorShortName} />
          </InputGroup>
        )}
      </Stack>
    </div>
  );
};

interface SubtotalPreviewProps {
  qty: CompleteCompositeQuantity;
  price: number;
}
const SubtotalPreview = ({ qty: ccq, price }: SubtotalPreviewProps) => {
  let qtyValue = QuantityM.numericValueC(ccq);
  let subtotal = qtyValue * price;
  return (
    <div className='alt-font-1 mr-3 w-36 flex-shrink-0 border-l-2 border-gray-200 text-right text-sm font-medium'>
      <p>
        <span className='text-base text-blue-700'>{numformat(qtyValue)}</span>
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

let demoQty = QuantityM.simplifyC({
  qty: { containers: 1, majorUnits: 20, minorUnits: 250 },
  unitInfo: UnitInfoM.fromCode("kg")
});

interface CartItemCardProps {
  itemEntry: CartEntry<Item>;
}
export const CartItemCard = ({ itemEntry }: CartItemCardProps) => {
  const item = itemEntry.offering;

  // TODO: optimize. This components (wastefully) re-renders way too much.

  const updateEntryQuantity = useTerminalStore(
    store => store.updateEntryQuantity
  );

  return (
    <div
      className='mt-4 flex h-16 items-center rounded-md border-2 border-blue-500 bg-white shadow-lg first:mt-0'
      title={item.name}
    >
      <div className='del-btn box-center aspect-square min-h-full cursor-pointer self-stretch bg-blue-500/20 text-blue-500 hover:bg-blue-500/30'>
        <Eye weight='regular' size='2.012rem' />
      </div>
      <div className='flex-grow overflow-x-hidden text-ellipsis whitespace-nowrap pl-3 text-base font-medium'>
        {item.name}
      </div>
      <QuantityPicker
        qty={itemEntry.quantityCC}
        onChange={newQty => {
          updateEntryQuantity(itemEntry.offeringId, newQty);
        }}
      />
      <SubtotalPreview qty={itemEntry.quantityCC} price={item.price} />
    </div>
  );
};
