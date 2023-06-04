// import { asFunction, asValue, Resolver } from 'awilix';
// import { PrismaClient } from '@prisma/client';
import * as Interfaces from '@application/common/interfaces';
// import * as repositories from './repositories';
// import { makeLogger } from './logger';

export type Dependencies = {
    // db: PrismaClient;
    logger: Interfaces.ILogger;
    productsRepository: Interfaces.IProductsRepository;
  };