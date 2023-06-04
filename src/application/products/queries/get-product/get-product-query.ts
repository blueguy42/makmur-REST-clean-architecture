import { Dependencies } from '@infrastructure/di';
import { NotFoundException } from '@application/common/exceptions';
import { toDto } from './get-product-query-mapper';
import { validate } from './get-product-query-validator';

export type GetProductQuery = Readonly<{
  id: string;
}>;

export function makeGetProductQuery({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function getProductQuery(query: GetProductQuery) {
    await validate(query);

    const { id } = query;
    
    const product = await productsRepository.getById({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} does not exist`);
    }

    return toDto(product);
  };
}
