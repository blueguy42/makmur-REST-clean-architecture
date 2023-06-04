import { Dependencies } from '@infrastructure/di';
import { Product } from '@domain/entities';
import { validate } from './create-product-command-validator';

export type CreateProductCommand = Readonly<{
  code: string;
  name: string;
  price: number;
  volume: number;
}>;

export function makeCreateProductCommand({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function createProductCommand(command: CreateProductCommand) {
    await validate(command);

    const product = new Product({
      code: command.code,
      name: command.name,
      price: command.price,
      volume: command.volume,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0
    });

    const { id } = await productsRepository.create({ product });
    
    return { 
      id
    };
  };
}