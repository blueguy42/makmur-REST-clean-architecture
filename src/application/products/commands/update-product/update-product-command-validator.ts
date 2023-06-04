import Joi from 'joi';
import { ValidationException } from '@application/common/exceptions';
import { UpdateProductCommand } from './update-product-command';

export async function validate(command: UpdateProductCommand) {
  try {
    const schema: Joi.ObjectSchema<UpdateProductCommand> = Joi.object({
      id: Joi.string().hex().length(24).required(),
      code: Joi.string().alphanum().max(12).optional(),
      name: Joi.string().alphanum().max(100).optional(),
    });
    
    await schema.validateAsync(command, { abortEarly: false, convert: false });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      throw new ValidationException(error.message, error.details, error._original);
    }
  }
}