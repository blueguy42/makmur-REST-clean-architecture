import mongoose, { Model } from 'mongoose';
import { IProductsRepository } from '@application/common/interfaces';
import { Dependencies } from '@infrastructure/di';
import { Product } from '@domain/entities';

interface IProduct {
  code: string;
  name: string;
  price: number;
  volume: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export function makeProductsRepository({ db, redis }: Pick<Dependencies, 'db' | 'redis'>): IProductsRepository {
  const ProductModel: Model<IProduct> = db.model('Product', new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    volume: { type: Number, required: true },
    deleted: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    version: { type: Number, required: true },
  }));

  return {
    async create({ product }) {
      const newProduct = new ProductModel({
        code: product.code,
        name: product.name,
        price: product.price,
        volume: product.volume,
        deleted: product.deleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        version: product.version,
      });

      await newProduct.save();

      await redis.del('products');

      return { id: newProduct._id.toString() };
    },

    async delete({ id }) {
      await ProductModel.findByIdAndUpdate(id, { deleted: true, updatedAt: new Date() });
      
      await redis.del('products');
      await redis.del(`products:${id}`);
    },

    async getById({ id }) {
      const cachedProduct = await redis.hgetall(`products:${id}`);
      if (Object.keys(cachedProduct).length !== 0) {
        return new Product({
          id: cachedProduct.id,
          code: cachedProduct.code,
          name: cachedProduct.name,
          price: Number(cachedProduct.price),
          volume: Number(cachedProduct.volume),
          deleted: cachedProduct.deleted === 'true',
          createdAt: new Date(cachedProduct.createdAt),
          updatedAt: new Date(cachedProduct.updatedAt),
          version: Number(cachedProduct.version),
        });
      }

      const product = await ProductModel.findOne({ _id: id, deleted: false });
      
      if (!product) {
        return null;
      }
      
      const productObject = {
        id: product._id.toString(),
        code: product.code,
        name: product.name,
        price: product.price,
        volume: product.volume,
        deleted: product.deleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        version: product.version,
      };

      await redis.hset(`products:${id}`, productObject);
      
      return new Product(productObject);
    },

    async list() {
      const cachedProducts = await redis.get('products');
      if (cachedProducts) {
        return JSON.parse(cachedProducts);
      }

      const products = await ProductModel.find({ deleted: false });

      const productsObject = {
        count: products.length,
        products: products.map((product) => new Product({
          id: product._id.toString(),
          code: product.code,
          name: product.name,
          price: product.price,
          volume: product.volume,
          deleted: product.deleted,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          version: product.version,
        })),
      };

      await redis.set('products', JSON.stringify(productsObject));

      return productsObject;
    },

    async update({ product }) {
      await ProductModel.findByIdAndUpdate(product.id, {
        code: product.code,
        name: product.name,
        price: product.price,
        volume: product.volume,
        updatedAt: new Date(),
        version: product.version + 1,
      }, { runValidators: true }); 

      await redis.del('products');
      await redis.del(`products:${product.id}`);
    },
  }
}