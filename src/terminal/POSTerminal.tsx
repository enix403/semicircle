import cx from 'classnames';
import { ReactElement, useEffect } from "react";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { FlexGrow } from "components/FlexGrow/FlexGrow";
import { callProtoService } from "repositories";
import { QueryItems } from "types/protos-ts/offerings_pb";
import { CartView } from "./CartView";
import { CheckoutTable } from "./CheckoutTable";
import { Financials } from "./Financials";
import { OfferingsPane } from "./OfferingsPane";
import { numformat, useTotalBill } from "./common";
import { Stage, useTerminalStore } from "./state/store";

import "./terminal-global.css";

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
  const itemCount = useTerminalStore(store => store.cart.items.length);
  const setStage = useTerminalStore(store => store.setStage);
  const totalBill = useTerminalStore(useTotalBill);

  return (
    <div className='flex border-t-8 border-cyan-900 bg-cyan-800 px-4 py-4'>
      <StatBlock name='Item Count' value={itemCount} />
      <StatBlock name='Total Bill' value={numformat(totalBill)} />
      <FlexGrow />
      <div
        className={cx(
          'box-center transition-colors ml-4 h-14 rounded-md border-2 px-3 font-semibold',
          itemCount !== 0 ?
            "cursor-pointer border-green-300 text-green-300 hover:bg-green-300/80 hover:text-black" :
            "cursor-not-allowed border-gray-400/60 text-black/40 bg-gray-600/30"
        )}
        onClick={() => itemCount !== 0 && setStage(Stage.Checkout)}
      >
        Checkout
      </div>
    </div>
  );
}

const animationProps: HTMLMotionProps<"div"> = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
  className: "flex flex-[1.5] flex-col"
};

export function POSTerminal(): ReactElement {
  const updateOfferings = useTerminalStore(store => store.updateOfferings);
  const stage = useTerminalStore(store => store.stage);

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
        <AnimatePresence mode='wait'>
          {stage === Stage.Idle && (
            <motion.div key='idle' {...animationProps}>
              <OfferingsPane />
              <Stats />
            </motion.div>
          )}

          {stage === Stage.Checkout && (
            <motion.div key='checkout' {...animationProps}>
              <Financials />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-1 flex-col border-l-2 border-zinc-300 bg-slate-100'>
          <AnimatePresence mode='wait'>
            {stage === Stage.Idle && (
              <motion.div key='idle' {...animationProps}>
                <CartView />
              </motion.div>
            )}

            {stage === Stage.Checkout && (
              <motion.div key='checkout' {...animationProps}>
                <CheckoutTable />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
