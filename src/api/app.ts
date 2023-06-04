import express from 'express';
import { Dependencies } from '@api/container';
import * as controllers from './controllers';
import * as middlewares from './middlewares';

export function makeApp(dependencies: Dependencies) {
  const app = express();

  middlewares.onRequest({ app });

  app.use(controllers.productsController({ dependencies, router: express.Router() }));

  middlewares.onResponse({ app, dependencies });

  return app;
}
