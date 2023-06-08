import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { numformat, useSubtotal } from "./common";
import { useTerminalStore } from "./state/store";

export function CheckoutTable() {
  const { items } = useTerminalStore(store => store.cart);

  return (
    <TableContainer>
      <Table size='sm' variant='striped' colorScheme='blackAlpha'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Qty</Th>
            <Th isNumeric>Subtotal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(item => {
            let price = item.offering.price;
            const { subtotal, qty } = useSubtotal(item.offQty, price);
            return (
              <Tr key={item.offering.id}>
                <Td>{item.offering.name}</Td>
                <Td isNumeric>{numformat(price)}</Td>
                <Td isNumeric>{qty}</Td>
                <Td isNumeric>{subtotal}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
