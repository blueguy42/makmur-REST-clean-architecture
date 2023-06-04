import { Product } from '@domain/entities';

export function toDto(product: Product) {
  return {
    id: product.id,
    code: product.code,
    name: product.name,
    price: product.price,
    volume: product.volume,
  };
}
