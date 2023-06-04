import { Dependencies } from '@infrastructure/di';
import { toDto } from './list-products-query-mapper';

export function makeListProductQuery({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function listProductsQuery() {
    const { count, products } = await productsRepository.list();

    return toDto({
      count,
      products,
    });
  };
}
