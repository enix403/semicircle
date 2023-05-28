import { Input, InputGroup, InputRightAddon, Stack } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";

import React from "react";
import "./CartItemCard.css";

import classNames from "classnames";
import { Item } from "types/protos-ts/offerings_pb";
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
const QuantityPicker = ({ qty: ccq }: QuantityPickerProps) => {
  let unitInfo = ccq.unitInfo;
  let fractional = !UnitInfoM.isCountable(unitInfo);

  let widthClass = fractional ? "w-60" : "w-36";

  return (
    <div className={classNames("alt-font-1 mr-3 font-medium", widthClass)}>
      <Stack direction='row'>
        <InputGroup size='sm'>
          <Input
            className='text-right'
            type='number'
            defaultValue={ccq.qty.majorUnits}
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
}
const SubtotalPreview = ({ qty: ccq }: SubtotalPreviewProps) => {
  let qtyRendered = QuantityM.renderValueC(ccq);
  return (
    <div className='alt-font-1 mr-3 w-36 text-right text-sm font-medium'>
      <p>
        <span className='text-base text-blue-700'>{qtyRendered}</span>
        <span className='text-xs text-slate-700'> {ccq.unitInfo.majorShortName} x 4520</span>
      </p>
      <p>
        = <span className='text-lg text-yellow-600'>74520</span>
      </p>
    </div>
  );
};

let demoQty = QuantityM.simplifyC({
  qty: { containers: 1, majorUnits: 20, minorUnits: 250 },
  unitInfo: UnitInfoM.fromCode("kg")
});

interface CartItemCardProps {
  item: Item
};
export const CartItemCard = ({item}: CartItemCardProps) => {
  return (
    <div className='mt-4 flex h-16 items-center rounded-md border-2 border-amber-500 bg-white shadow-lg first:mt-0'>
      <div className='del-btn box-center aspect-square min-h-full cursor-pointer self-stretch bg-red-500/20 text-red-500 hover:bg-red-500/30'>
        <Trash weight='regular' size='2.012rem' />
      </div>
      <div className='flex-grow whitespace-nowrap pl-3 text-base font-medium'>
        {item.name}
      </div>
      <QuantityPicker qty={demoQty} />
      <SubtotalPreview qty={demoQty} />
    </div>
  );
};
