type ProductType = {
    id: string;
    code: string;
    name: string;
    price: number;
    volume: number;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    version: number;
};

export class Product {
    public id: string;
    public code: string;
    public name: string;
    public price: number;
    public volume: number;
    public deleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public version: number;
    
    constructor(product: ProductType) {
      this.id = product.id;
      this.code = product.code;
      this.name = product.name;
      this.price = product.price;
      this.volume = product.volume;
      this.deleted = product.deleted;
      this.createdAt = product.createdAt;
      this.updatedAt = product.updatedAt;
      this.version = product.version;
    }
}