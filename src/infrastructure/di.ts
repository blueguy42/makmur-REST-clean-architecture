import { asFunction, asValue, Resolver } from 'awilix';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import * as Interfaces from '@application/common/interfaces';
import * as repositories from './repositories';
import { makeLogger } from './logger';

export type Dependencies = {
  db: mongoose.Connection;
  redis: Redis;
  logger: Interfaces.ILogger;
  productsRepository: Interfaces.IProductsRepository;
};

export function makeInfrastructure(): { [dependency in keyof Dependencies]: Resolver<Dependencies[dependency]> } {
  const logger = makeLogger();

  mongoose.connect(String(process.env.MONGO_URL))
  .then(() => {
    logger.info({ detail: 'Successfully connected to MongoDB!' });
  })
  .catch(() => {
    logger.error({ detail: 'Failed to establish a connection to the database!' });
    process.exit(1);
  });

  const db = mongoose.connection;
  const redis = new Redis(String(process.env.REDIS_URL));

  return {
    db: asValue(db),
    redis: asValue(redis),
    logger: asValue(logger),
    productsRepository: asFunction(repositories.makeProductsRepository).singleton(),
  };
}
