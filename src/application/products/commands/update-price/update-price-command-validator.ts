import Joi from 'joi';
import { ValidationException } from '@application/common/exceptions';
import { UpdatePriceCommand } from './update-price-command';

export async function validate(command: UpdatePriceCommand) {
  try {
    const schema: Joi.ObjectSchema<UpdatePriceCommand> = Joi.object({
      id: Joi.string().hex().length(24).required(),
      price: Joi.number().min(0).integer().required(),
    });
    
    await schema.validateAsync(command, { abortEarly: false, convert: false });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      throw new ValidationException(error.message, error.details, error._original);
    }
  }
}