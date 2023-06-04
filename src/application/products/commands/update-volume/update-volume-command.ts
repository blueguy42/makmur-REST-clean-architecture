import { Dependencies } from '@infrastructure/di';
import { NotFoundException } from '@application/common/exceptions';
import { validate } from './update-volume-command-validator';

export type UpdateVolumeCommand = Readonly<{
  id: string;
  volume: number;
}>;

export function makeUpdateVolumeCommand({ productsRepository }: Pick<Dependencies, 'productsRepository'>) {
  return async function updateVolumeCommand(command: UpdateVolumeCommand) {
    await validate(command);

    const { id, volume } = command;

    const product = await productsRepository.getById({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} does not exist`);
    }
    
    product.volume = volume;

    await productsRepository.update({ product });
  };
}
