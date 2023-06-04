import { Product } from '@domain/entities';

export interface IProductsRepository {
  create(parameters: { product : Product }): Promise<{ id: string }>;
  delete(parameters: { id: string }): Promise<void>;
  getById(parameters: { id: string }): Promise<Product | null>;
  list(): Promise<{ count: number; products: Array<Product> }>;
  update(parameters: { product: Product }): Promise<void>;
}
