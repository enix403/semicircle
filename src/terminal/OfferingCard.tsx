import { Icon, Minus, Plus } from "@phosphor-icons/react";
import classNames from "classnames";
import React, { ReactElement } from "react";
import { Item } from "types/protos-ts/offerings_pb";

import "./OfferingCard.css";

function CounterIconButton(IconComp: Icon) {
  return (
    <div className='flex aspect-square w-9 items-center justify-center rounded-full border border-purple-800 hover:bg-purple-800/10'>
      {<IconComp weight='regular' size='1.32rem' />}
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
    <div className='flex h-full flex-col items-end py-6 pr-4'>
      {CounterIconButton(Plus)}
      <div className='flex grow items-center pr-3 text-center text-2xl'>
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
  const [act, setAct] = React.useState(false);

  const { retail_item } = props;

  return (
    <div
      className={classNames(
        "m-2 mb-0 h-48 grow cursor-pointer overflow-hidden rounded-md border-2 border-purple-400",
        "anim-slide-bg",
        act && "activated [&_.price]:text-slate-950"
      )}
      onClick={e => {
        setAct(act => !act);
        e.stopPropagation();
      }}
    >
      <div className='table h-full w-full table-fixed border-collapse'>
        <div className='table-cell px-4 py-2 align-top'>
          <p className='text-xl font-medium'>{retail_item.name}</p>
          <p className='price text-sm font-light text-slate-600'>
            ${retail_item.price}
          </p>
        </div>

        <div className='table-cell h-full w-1/3'>
          <ProductCounter value={0} />
        </div>
      </div>
    </div>
  );
};
