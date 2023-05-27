import { Icon, Minus, Plus } from "@phosphor-icons/react";
import classNames from "classnames";
import React, { ReactElement } from "react";
import { Item } from "types/protos-ts/offerings_pb";

import "./OfferingCard.css";

function CounterIconButton(IconComp: Icon) {
  return (
    <div className='flex aspect-square w-8 items-center justify-center rounded-full border border-green-800 hover:bg-green-800/10'>
      {<IconComp weight='regular' size='1.22rem' />}
    </div>
  );
}

interface ProductCounterProps {
  value: number | string;
  onIncrement?: (newValue: number) => void;
  onDecrement?: (newValue: number) => void;
}
const ProductCounter = (props: ProductCounterProps): ReactElement => {
  const { value } = props;
  return (
    <div className='flex h-full flex-col items-end pt-8 pb-3 pr-3'>
      {CounterIconButton(Plus)}
      <div className='flex grow items-center pr-2 text-center text-lg font-medium alt-font-1'>
        {value}
      </div>
      {CounterIconButton(Minus)}
    </div>
  );
};

interface OfferingCardProps {
  activated?: boolean;
  retail_item: Item;
}
export const OfferingCard = (props: OfferingCardProps): ReactElement => {
  // const activated = !!props.activated;
  let [act, setAct] = React.useState(false);

  const { retail_item } = props;

  let outOfStock = retail_item.id == "7";
  let maxCapacityReached = retail_item.id == "16";

  if (maxCapacityReached)
    act = true;

  const preventAddition = outOfStock || maxCapacityReached;

  return (
    <div
      className={classNames(
        "m-2 mb-0 h-40 grow cursor-pointer overflow-hidden rounded-md border-2 border-green-400",
        "anim-slide-bg",
        act && "activated [&_.price]:text-slate-950",
        outOfStock && "disabled cursor-not-allowed border-gray-400 bg-gray-100 [&_.nt]:text-slate-400",
      )}
      onClick={e => {
        if (!preventAddition)
          setAct(act => !act);
        e.stopPropagation();
      }}
    >
      <div className='table h-full w-full table-fixed border-collapse' title={retail_item.name}>
        <div className='table-cell px-4 py-2 align-top'>
          <p className='text-lg font-medium nt'>{retail_item.name}</p>
          <p className='price text-sm text-slate-600 nt'>
            <span className="alt-font-1">{retail_item.price}/</span>
            <span>kg</span>
          </p>
          {outOfStock && <p className="text-red-700 font-medium text-base mt-4">
            Out of Stock
          </p>}
          {maxCapacityReached && <p className="text-orange-800 font-medium text-base mt-4">
            No more items left
          </p>}
        </div>

        <div className='table-cell h-full w-1/3 nt'>
          <ProductCounter value={1} />
        </div>
      </div>
    </div>
  );
};
