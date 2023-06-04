import Joi from 'joi';
import { ValidationException } from '@application/common/exceptions';
import { GetProductQuery } from './get-product-query';

export async function validate(query: GetProductQuery) {
  try {
    const schema: Joi.ObjectSchema<GetProductQuery> = Joi.object({
      id: Joi.string().hex().length(24).required(),
    });
    
    await schema.validateAsync(query, { abortEarly: false, convert: false });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      throw new ValidationException(error.message, error.details, error._original);
    }
  }
}