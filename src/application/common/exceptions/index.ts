import { ValidationError } from 'joi';

export class NotFoundException extends Error {}
export class ValidationException extends ValidationError {}