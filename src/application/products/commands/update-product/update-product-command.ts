import { Dependencies } from '@infrastructure/di';
import { NotFoundException } from '@application/common/exceptions';
import { validate } from './update-product-command-validator';

export type UpdateProductCommand = Readonly<{
  id: string;
  code?: string;
  name?: string;
}>;

export function makeUpdateProductCommand({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function updateProductCommand(command: UpdateProductCommand) {
    await validate(command);

    const { id, code, name } = command;

    const product = await productsRepository.getById({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} does not exist`);
    }

    if (code) {
      product.code = code;
    }

    if (name) {
      product.name = name;
    }

    await productsRepository.update({ product });
  };
}
