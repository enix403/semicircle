import { faker } from '@faker-js/faker';

export function genFakeRetailItem() {
  return {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price())
  };
}