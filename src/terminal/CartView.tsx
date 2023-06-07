import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { Snowflake } from "@phosphor-icons/react";
import { useRef } from 'react';

import { CartItemCard } from "./CartItemCard";
import { useTerminalStore } from "./state/store";

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

export function CartView() {
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