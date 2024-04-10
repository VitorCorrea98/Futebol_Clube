import Joi = require('joi');
import { IUserLogin } from '../../Interfaces/users/IUser';
import { ServiceResponseError } from '../../Interfaces/ServiceResponse';

export default class Validate {
  constructor(private _user: IUserLogin) {}

  public Login(): ServiceResponseError | null {
    const errorMessage = 'All fields must be filled';
    const userKeys = Joi.object({
      password: Joi.string().min(6).required().messages({
        'any.required': errorMessage,
        'string.empty': errorMessage,
      }),
      email: Joi.string().email().required().messages({
        'any.required': errorMessage,
        'string.empty': errorMessage,
      }),
    });

    const { error } = userKeys.validate(this._user);

    if (error) {
      return { status: 'INVALID_DATA', data: { message: error?.message } };
    }

    return null;
  }
}
