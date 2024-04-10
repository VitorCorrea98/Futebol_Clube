import Joi = require('joi');
import { IUserLogin } from '../../Interfaces/users/IUser';
import { ServiceResponseError } from '../../Interfaces/ServiceResponse';

export default class Validate {
  constructor(private _user: IUserLogin) {}

  public Login(): ServiceResponseError | null {
    const errorMessage = 'All fields must be filled';
    const anotherErrorMessage = 'Invalid email or password';
    const userKeys = Joi.object({
      password: Joi.string().min(6).required().messages({ 'any.required': errorMessage,
        'string.empty': errorMessage,
        'string.min': anotherErrorMessage }),
      email: Joi.string().email().required().messages({ 'any.required': errorMessage,
        'string.empty': errorMessage,
        'string.email': anotherErrorMessage }) });
    const { error } = userKeys.validate(this._user);
    if (error) {
      const message = error.message.includes(errorMessage) ? 'INVALID_DATA' : 'INVALID_KEYS';
      return {
        status: message, data: { message: error?.message } };
    }
    return null;
  }
}
