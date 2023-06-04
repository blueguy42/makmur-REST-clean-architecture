import { Dependencies } from '@infrastructure/di';
import { NotFoundException } from '@application/common/exceptions';
import { validate } from './update-price-command-validator';

export type UpdatePriceCommand = Readonly<{
  id: string;
  price: number;
}>;

export function makeUpdatePriceCommand({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function updatePriceCommand(command: UpdatePriceCommand) {
    await validate(command);

    const { id, price } = command;

    const product = await productsRepository.getById({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} does does not exist`);
    }
    
    product.price = price;

    await productsRepository.update({ product });
  };
}
