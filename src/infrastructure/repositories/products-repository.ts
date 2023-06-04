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

export function makeProductsRepository({ db }: Pick<Dependencies, 'db'>): IProductsRepository {
  const ProductModel: Model<IProduct> = db.model('Product', new mongoose.Schema({
    code: { type: String, required: true },
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

      return { id: newProduct._id.toString() };
    },

    async delete({ id }) {
      await ProductModel.findByIdAndUpdate(id, { deleted: true, updatedAt: new Date() });
    },

    async getById({ id }) {
      const product = await ProductModel.findOne({ _id: id, deleted: false });
      
      if (!product) {
        return null;
      }

      return new Product({
        id: product._id.toString(),
        code: product.code,
        name: product.name,
        price: product.price,
        volume: product.volume,
        deleted: product.deleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        version: product.version,
      });
    },

    async list() {
      const products = await ProductModel.find({ deleted: false });

      return {
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
    },

    async update({ product }) {
      await ProductModel.findByIdAndUpdate(product.id, {
        code: product.code,
        name: product.name,
        price: product.price,
        volume: product.volume,
        updatedAt: new Date(),
        version: product.version + 1,
      }); 
    },
  }
}