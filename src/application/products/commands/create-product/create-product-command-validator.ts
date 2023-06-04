import Joi from 'joi';
import { ValidationException } from '@application/common/exceptions';
import { CreateProductCommand } from './create-product-command';

export async function validate(command: CreateProductCommand) {
  try {
    const schema: Joi.ObjectSchema<CreateProductCommand> = Joi.object({
      code: Joi.string().alphanum().max(12).required(),
      name: Joi.string().alphanum().max(100).required(),
      price: Joi.number().min(0).integer().required(),
      volume: Joi.number().min(0).integer().required(),
    });
    
    await schema.validateAsync(command, { abortEarly: false, convert: false });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      throw new ValidationException(error.message, error.details, error._original);
    }
  }
}