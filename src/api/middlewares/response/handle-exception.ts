import { NextFunction, Request, Response } from 'express';
import * as Exceptions from '@application/common/exceptions';
import { Dependencies } from '@api/container';

type ExceptionResponse = {
  detail?: string; // A human-readable explanation specific to this occurrence of the problem.
  errors?: string[]; // Error details (validation result etc)
  status: number; // The HTTP status code
  title: string; // A short, human-readable summary of the problem type
};

export function makeHandleException({ logger }: Pick<Dependencies, 'logger'>) {
  return function handler(error: Error, _request: Request, response: Response, _: NextFunction) {
    let exception: ExceptionResponse | null = null;

    switch (error.constructor) {
      case Exceptions.NotFoundException:
        exception = notFoundExceptionResponse(error);
        break;
      case Exceptions.ValidationException:
        exception = validationExceptionResponse(error as Exceptions.ValidationException);
        break;
      default:
        exception = internalServerException();
    }

    logger.error({
      detail: `Handling exception`,
      message: error.message,
    });

    return response.status(exception.status).json(exception);
  };
}

function notFoundExceptionResponse({ message }: Exceptions.NotFoundException): ExceptionResponse {
  return {
    ...(message && { detail: message }),
    status: 404,
    title: 'The specified resource was not found',
  };
}

function internalServerException(): ExceptionResponse {
  return {
    status: 500,
    title: 'An error occurred while processing your request',
  };
}

function validationExceptionResponse(error: Exceptions.ValidationException): ExceptionResponse {
  return {
    ...(error.message && { detail: error.message }),
    errors: error.details.map((detail) => detail.message),
    status: 400,
    title: 'The request was invalid',
  };
}
