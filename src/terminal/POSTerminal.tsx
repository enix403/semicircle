import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Snowflake } from "@phosphor-icons/react";
import { ReactElement, useEffect, useRef } from "react";

import { FlexGrow } from "components/FlexGrow/FlexGrow";
import { callProtoService } from "repositories";
import { QueryItems } from "types/protos-ts/offerings_pb";
import { QuantityM } from "types/quantification";
import { CartItemCard } from "./CartItemCard";
import { OfferingCard } from "./OfferingCard";
import { numformat } from "./common";
import { useTerminalStore } from "./state/store";

import "./terminal-global.css";

function OfferingsPane(): ReactElement | null {
  const { allItems } = useTerminalStore(store => store.offerings);

  return (
    <div className='flex h-full flex-wrap content-start overflow-y-auto p-4'>
      {allItems.map(item => (
        <div className='pt-2 h-40 w-1/5 px-2' key={item.id}>
          <OfferingCard item={item} />
        </div>
      ))}
    </div>
  );
}

interface ClearCartProps {
  onConfirm: () => void;
  itemCount: number;
}
function ClearCart({ onConfirm, itemCount }: ClearCartProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  return (
    <>
      <Button onClick={onOpen} className='float-right' colorScheme='red'>
        Clear
      </Button>
      <AlertDialog leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Clear Cart?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to remove all items from the current cart.{" "}
            <strong>{itemCount}</strong> item(s) will be removed.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={onConfirm} colorScheme='red' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function CartPane() {
  const { items } = useTerminalStore(store => store.cart);
  const clearCart = useTerminalStore(store => store.clearCart);

  const itemCount = items.length;

  return (
    <>
      {itemCount != 0 && (
        <div className='px-4 py-2'>
          <ClearCart itemCount={itemCount} onConfirm={() => clearCart()} />
        </div>
      )}
      <div className='flex-1 overflow-y-auto p-5 pt-2'>
        {items.map(entry => (
          <CartItemCard key={entry.offering.id} itemEntry={entry} />
        ))}
        {itemCount == 0 && (
          <div className='box-center m-2 h-full flex-col'>
            <Snowflake weight='light' size='16rem' />
            <p className='pb-10 text-base'>No items added</p>
          </div>
        )}
      </div>
    </>
  );
}

interface StatBlockProps {
  name: string;
  value: string | number;
}
function StatBlock(props: StatBlockProps) {
  return (
    <div className='border-2s mx-2 inline-block w-52 border-red-800 text-white'>
      <p className='text-sm font-bold uppercase'>{props.name}</p>
      <p className='alt-font-1 mt-1 text-2xl font-medium text-amber-300'>{props.value}</p>
    </div>
  );
}

function Stats() {
  const items = useTerminalStore(store => store.cart.items);

  const totalBill = items.reduce((total, item) => {
    let qtyValue = QuantityM.numericValueC(item.offQty);
    let subtotal = item.offering.price * qtyValue;
    return total + subtotal;
  }, 0);

  return (
    <div className='flex h-24 border-t-8 border-cyan-900 bg-cyan-800 px-4 py-4'>
      <StatBlock name='Item Count' value={items.length} />
      <StatBlock name='Total Bill' value={numformat(totalBill)} />
      <FlexGrow />
      <div className='box-center ml-4 cursor-pointer rounded-md border-2 border-green-300 px-3 font-semibold text-green-300 hover:bg-green-300/10'>
        Checkout
      </div>
    </div>
  );
}

export function POSTerminal(): ReactElement {
  const updateOfferings = useTerminalStore(store => store.updateOfferings);

  useEffect(() => {
    (async function () {
      let result = await callProtoService(QueryItems);

      if (result === null) {
        console.log("Error Effect");
        return;
      }

      updateOfferings({
        allItems: result.items
        // allServices: []
      });
    })();
  }, []);

  return (
    <>
      <div className='flex h-full max-h-full overflow-hidden'>
        <div className='flex flex-[1.5] flex-col'>
          <OfferingsPane />
          <Stats />
        </div>
        <div className='flex flex-1 flex-col border-l-2 border-zinc-300 bg-slate-100'>
          <CartPane />
        </div>
      </div>
    </>
  );
}
