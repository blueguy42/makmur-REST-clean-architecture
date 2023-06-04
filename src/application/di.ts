import { asFunction, Resolver } from 'awilix';
import { makeProducts } from './products';

export type Dependencies = {
  products: ReturnType<typeof makeProducts>;
};

export function makeApplication(): { [dependency in keyof Dependencies]: Resolver<Dependencies[dependency]> } {
  return {
    products: asFunction(makeProducts).singleton(),
  };
}
