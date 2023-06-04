import { Product } from '@domain/entities';

export function toDto({
  count,
  products,
}: {
  count: number;
  products: Array<Product>;
}) {
  return {
    count,
    products: products.map((product) => ({
      id: product.id,
      code: product.code,
      name: product.name,
      price: product.price,
      volume: product.volume,
    })),
  };
}
