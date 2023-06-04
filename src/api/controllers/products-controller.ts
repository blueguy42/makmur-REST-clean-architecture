import { IRouter } from 'express';
import { Dependencies } from '@api/container';

export function productsController({ dependencies, router }: { dependencies: Dependencies; router: IRouter }) {
  router.post('/api/products', async function createProduct(request, response, next) {
    try {
      const result = await dependencies.products.commands.createProduct(request.body);

      return response.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  });

  router.delete('/api/products/:id', async function deleteProduct(request, response, next) {
    try {
      await dependencies.products.commands.deleteProduct({ id: request.params.id });

      return response.status(200).json({});
    } catch (error) {
      return next(error);
    }
  });

  router.get('/api/products/:id', async function getProduct(request, response, next) {
    try {
      const result = await dependencies.products.queries.getProduct({ id: request.params.id });

      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/api/products', async function listProducts(_request, response, next) {
    try {
      const result = await dependencies.products.queries.listProducts();

      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  });

  router.patch('/api/products/:id', async function updateProduct(request, response, next) {
    try {
      await dependencies.products.commands.updateProduct({
        id: request.params.id,
        code: request.body.code,
        name: request.body.name,
      });

      return response.status(200).json({});
    } catch (error) {
      return next(error);
    }
  });

  router.patch('/api/products/:id/price', async function updatePrice(request, response, next) {
    try {
      await dependencies.products.commands.updatePrice({
        id: request.params.id,
        price: Number(request.body.price),
      });

      return response.status(200).json({});
    } catch (error) {
      return next(error);
    }
  });

  router.patch('/api/products/:id/volume', async function updateVolume(request, response, next) {
    try {
      await dependencies.products.commands.updateVolume({
        id: request.params.id,
        volume: Number(request.body.volume),
      });

      return response.status(200).json({});
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
