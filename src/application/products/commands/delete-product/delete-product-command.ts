import { Dependencies } from '@infrastructure/di';
import { validate } from './delete-product-command-validator';
import { NotFoundException } from '@application/common/exceptions';

export type DeleteProductCommand = Readonly<{
  id: string;
}>;

export function makeDeleteProductCommand({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function deleteProductCommand(command: DeleteProductCommand) {
    await validate(command);

    const { id } = command;

    const product = await productsRepository.getById({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} does does not exist`);
    }

    await productsRepository.delete({ id });
  };
}
