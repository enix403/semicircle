import { Icon, Minus, Plus, SelectionForeground } from "@phosphor-icons/react";
import classNames from "classnames";
import React, { ReactElement } from "react";
import { Item } from "types/protos-ts/offerings_pb";
import {
  CompleteCompositeQuantity,
  CompositeQuantity,
  QuantityM,
  UnitInfoM
} from "types/quantification";
import { numformat } from "./common";

import "./OfferingCard.css";
import { useTerminalStore } from "./state/store";

const CounterIconButton = (
  props: { iconComp: Icon } & React.HTMLProps<HTMLDivElement>
) => {
  const { iconComp: IconComp, ...rest } = props;
  return (
    <div
      {...rest}
      className='flex aspect-square w-8 items-center justify-center rounded-full border border-gray-800 hover:bg-gray-800/10'
    >
      <IconComp weight='regular' size='1.22rem' />
    </div>
  );
};

interface ProductCounterProps {
  value: number | string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
const ProductCounter = (props: ProductCounterProps): ReactElement => {
  const { value } = props;
  return (
    <div className='flex h-full flex-col items-end pb-3 pr-3 pt-8'>
      <CounterIconButton
        iconComp={Plus}
        onClick={e => {
          props.onIncrement?.();
          e.stopPropagation();
        }}
      />
      <div className='alt-font-1 flex grow items-center pr-2 text-center text-lg font-medium'>
        {value}
      </div>
      <CounterIconButton
        iconComp={Minus}
        onClick={e => {
          props.onDecrement?.();
          e.stopPropagation();
        }}
      />
    </div>
  );
};

const zeroQuanityC = QuantityM.createC(0);
interface OfferingCardProps {
  activated?: boolean;
  item: Item;
}
export const OfferingCard = (props: OfferingCardProps): ReactElement => {
  const addToCart = useTerminalStore(store => store.addToCart);
  const updateEntryQuantity = useTerminalStore(
    store => store.updateEntryQuantity
  );
  const { item } = props;

  const unitInfo = React.useMemo(() => UnitInfoM.fromCode(item.unitCode), []);
  const unitInfoCountable = React.useMemo(
    () => UnitInfoM.isCountable(unitInfo),
    []
  );

  const cartOffQty: CompositeQuantity = useTerminalStore(store => {
    let cartItem = store.cart.items.find(ent => ent.offering.id === item.id);
    if (!cartItem) return zeroQuanityC;
    return cartItem.offQty.qty;
  }, QuantityM.compareC);

  let active = !QuantityM.isZeroC(cartOffQty);
  let outOfStock = false;
  let maxCapacityReached = false;

  const preventAddition = outOfStock || maxCapacityReached;

  let qtyValue = QuantityM.numericValueC({
    unitInfo,
    qty: cartOffQty
  });
  let qtyRendered = unitInfoCountable
    ? qtyValue.toString()
    : numformat(qtyValue);

  return (
    <div
      className={classNames(
        "m-2 mb-0 h-40 grow overflow-hidden rounded-md border-2 border-gray-400",
        "anim-slide-bg",
        active && "activated [&_.price]:text-slate-950",
        outOfStock
          ? "disabled cursor-not-allowed border-gray-400 bg-gray-100 [&_.nt]:text-slate-400"
          : "cursor-pointer"
      )}
      onClick={e => {
        if (!preventAddition && qtyValue == 0) addToCart(item);
        e.stopPropagation();
      }}
    >
      <div
        className='table h-full w-full table-fixed border-collapse'
        title={item.name}
      >
        <div className='table-cell px-4 py-2 align-top'>
          <p className='nt text-lg  font-medium'>{item.name}</p>
          <p className='price nt text-sm text-slate-600'>
            <span className='alt-font-1'>{item.price}/</span>
            <span>{unitInfo.majorShortName}</span>
          </p>
          {outOfStock && (
            <p className='mt-4 text-base font-medium text-red-700'>
              Out of Stock
            </p>
          )}
          {maxCapacityReached && (
            <p className='mt-4 text-base font-medium text-orange-800'>
              No more items left
            </p>
          )}
        </div>

        <div className='nt table-cell h-full w-1/3'>
          <ProductCounter
            onIncrement={() => {
              addToCart(item);
            }}
            onDecrement={() => {
              updateEntryQuantity(
                item,
                {
                  ...cartOffQty,
                  majorUnits: cartOffQty.majorUnits - 1
                },
                true
              );
            }}
            value={qtyRendered}
          />
        </div>
      </div>
    </div>
  );
};
