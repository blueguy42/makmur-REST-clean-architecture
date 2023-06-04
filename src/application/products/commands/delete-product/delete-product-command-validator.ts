import Joi from 'joi';
import { ValidationException } from '@application/common/exceptions';
import { DeleteProductCommand } from './delete-product-command';

export async function validate(command: DeleteProductCommand) {
  try {
    const schema: Joi.ObjectSchema<DeleteProductCommand> = Joi.object({
      id: Joi.string().hex().length(24).required(),
    });
    
    await schema.validateAsync(command, { abortEarly: false, convert: false });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      throw new ValidationException(error.message, error.details, error._original);
    }
  }
}