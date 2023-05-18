import { faker } from '@faker-js/faker';
import { RetailItem } from 'types';

export function genFakeRetailItem(): RetailItem {
  return {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price())
  };
}