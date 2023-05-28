import { Input, InputGroup, InputRightAddon, Stack } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";

import React from "react";
import "./CartItemCard.css";

import classNames from "classnames";
import {
  CompleteCompositeQuantity,
  QuantityM,
  UnitInfoM
} from "types/quantification";

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
}
const QuantityPicker = ({ qty }: QuantityPickerProps) => {
  let unitInfo = qty.unitInfo;
  let fractional = !UnitInfoM.isCountable(unitInfo);

  let widthClass = fractional ? "w-72" : "w-36";

  return (
    <div className={classNames("alt-font-1 mr-3 font-medium", widthClass)}>
      <Stack direction='row'>
        <InputGroup size='sm'>
          <Input
            className='text-right'
            type='number'
            value={qty.qty.majorUnits}
          />
          <InputRightAddon children={unitInfo.majorShortName} />
        </InputGroup>
        {fractional && (
          <InputGroup size='sm'>
            <Input
              className='text-right'
              type='number'
              value={qty.qty.minorUnits}
            />
            <InputRightAddon children={unitInfo.minorShortName} />
          </InputGroup>
        )}
      </Stack>
    </div>
  );
};

const SubtotalPreview = () => {
  return (
    <div className='alt-font-1 mr-3 w-28 text-right text-sm font-medium'>
      <p>
        <span className='text-base text-blue-700'>934</span> x{" "}
        <span className='text-xs text-slate-700'>4520</span>
      </p>
      <p>
        = <span className='text-lg text-yellow-600'>74520</span>
      </p>
    </div>
  );
};

const demoQty: CompleteCompositeQuantity = {
  qty: { containers: 1, majorUnits: 6, minorUnits: 500 },
  unitInfo: UnitInfoM.fromCode("kg")
};

export const CartItemCard = () => {
  return (
    <div className='mt-4 flex h-16 items-center rounded-md border-2 border-amber-500 bg-white shadow-lg first:mt-0'>
      <div className='box-center aspect-square min-h-full cursor-pointer self-stretch bg-red-500/20 text-red-500 hover:bg-red-500/30'>
        <Trash weight='regular' size='2.012rem' />
      </div>
      <div className='flex-grow whitespace-nowrap pl-3 text-base font-medium'>
        PC Item
      </div>
      <QuantityPicker qty={demoQty} />
      <SubtotalPreview />
    </div>
  );
};
