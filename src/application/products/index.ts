import { Dependencies } from '@infrastructure/di';
import { makeCreateProductCommand } from './commands/create-product';
import { makeDeleteProductCommand } from './commands/delete-product';
import { makeUpdateProductCommand } from './commands/update-product';
import { makeUpdatePriceCommand } from './commands/update-price';
import { makeUpdateVolumeCommand } from './commands/update-volume';
import { makeGetProductQuery } from './queries/get-product';
import { makeListProductQuery } from './queries/list-products';

export function makeProducts(dependencies: Dependencies) {
  return {
    commands: {
      createProduct: makeCreateProductCommand(dependencies),
      deleteProduct: makeDeleteProductCommand(dependencies),
      updateProduct: makeUpdateProductCommand(dependencies),
      updatePrice: makeUpdatePriceCommand(dependencies),
      updateVolume: makeUpdateVolumeCommand(dependencies),
    },
    queries: {
      getProduct: makeGetProductQuery(dependencies),
      listProducts: makeListProductQuery(dependencies),
    },
  }
}