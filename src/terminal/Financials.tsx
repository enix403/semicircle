import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CurrencyDollar, NotePencil } from "@phosphor-icons/react";
import cx from "classnames";

import { numformat } from "./common";
import { useTerminalStore } from "./state/store";

// const SummaryChip = (props: React.HTML/)

export function Financials() {
  const mode = "cash" as string;

  return (
    <>
      <div className=' p-8'>
        <FormControl size='lg'>
          <FormLabel>Enter Discount</FormLabel>
          <Input placeholder='Discount' type='number' />
        </FormControl>

        <FormLabel className="mt-6">Payment Mode</FormLabel>
        <div className='mb-6 flex'>
          <div
            className={cx(
              "mr-2 w-24 px-2 py-4",
              "box-center-v cursor-pointer rounded-md",
              "border-2 border-emerald-400",
              mode === "cash"
                ? "bg-emerald-400 text-white"
                : "text-emerald-600 hover:bg-emerald-300/30"
            )}
          >
            <CurrencyDollar size={25} weight='bold' />
            <p className='font-medium'>Cash</p>
          </div>

          <div
            className={cx(
              "mr-2 w-24 px-2 py-4",
              "box-center-v cursor-pointer rounded-md",
              "border-2 border-emerald-400",
              mode === "credit"
                ? "bg-emerald-400 text-white"
                : "text-emerald-600 hover:bg-emerald-300/30"
            )}
          >
            <NotePencil size={25} weight='bold' />
            <p className='font-medium'>Credit</p>
          </div>
        </div>

        <FormControl>
          <FormLabel>Amount Paid</FormLabel>
          <Input placeholder='Amount Paid' type='number' />
        </FormControl>
      </div>

      <div className='flex-1 p-8 pt-0'>
        <p className='mb-4 font-semibold'>Order Summary</p>

        <div className='order-summary'>
          <div className='bg-teal-400/20'>
            <p className='alt-font-1 text-xl font-semibold text-teal-600'>14</p>
            <p className='text-sm mt-1 text-teal-600'>Item Count</p>
          </div>
          <div className='bg-pink-400/20'>
            <p className='alt-font-1 text-xl font-semibold text-pink-600'>23,500</p>
            <p className='text-sm mt-1 text-pink-600'>Total Bill</p>
          </div>
          <div className='bg-blue-400/20'>
            <p className='alt-font-1 text-xl font-semibold text-blue-600'>23,000</p>
            <p className='text-sm mt-1 text-blue-600'>Total Payable</p>
          </div>
          <div className='bg-yellow-400/20'>
            <p className='alt-font-1 text-xl font-semibold text-yellow-600'>N/A</p>
            <p className='text-sm mt-1 text-yellow-600'>Change</p>
          </div>
        </div>
      </div>
    </>
  );
}