import Joi from 'joi';
import { ValidationException } from '@application/common/exceptions';
import { UpdateVolumeCommand } from './update-volume-command';

export async function validate(command: UpdateVolumeCommand) {
  try {
    const schema: Joi.ObjectSchema<UpdateVolumeCommand> = Joi.object({
      id: Joi.string().hex().length(24).required(),
      volume: Joi.number().min(0).integer().required(),
    });
    
    await schema.validateAsync(command, { abortEarly: false, convert: false });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      throw new ValidationException(error.message, error.details, error._original);
    }
  }
}