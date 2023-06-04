import { Request, Response } from 'express';

export function makeHandleNotFound() {
  return function handler(_request: Request, response: Response) {
    return response.status(404).send({
      status: 404,
      title: 'The specified resource was not found.',
    });
  };
}
