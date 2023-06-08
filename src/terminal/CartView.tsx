import { useRef } from "react";

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
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { CartItemCard } from "./CartItemCard";
import { useTerminalStore } from "./state/store";

interface ClearCartProps {
  itemCount: number;
}
function ClearCart({ itemCount }: ClearCartProps) {
  const clearCart = useTerminalStore(store => store.clearCart);

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
            <Button onClick={() => clearCart()} colorScheme='red' ml={3}>
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

  const itemCount = items.length;

  return (
    <>
      {itemCount != 0 && (
        <div className='px-4 py-2'>
          <ClearCart itemCount={itemCount} />
        </div>
      )}
      <div className='flex-1 overflow-y-auto p-5 pt-2'>
        <AnimatePresence>
          {items.map(entry => (
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{ duration: 0.1 }}
              className='mt-4 first:mt-0'
              key={entry.offering.id}
            >
              <CartItemCard itemEntry={entry} />
            </motion.div>
          ))}
        </AnimatePresence>
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
