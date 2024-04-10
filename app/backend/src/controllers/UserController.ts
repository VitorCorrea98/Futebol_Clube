import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
import { IUserLogin } from '../Interfaces/users/IUser';
import { ServiceResponseError } from '../Interfaces/ServiceResponse';
import Validate from '../middlewares/user/LoginValidate';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async findByEmail(req: Request, res: Response) {
    const user = req.body as IUserLogin;
    const error = new Validate(user).Login() as unknown as ServiceResponseError;
    if (error) return res.status(mapStatusHTTP(error.status)).json(error.data);

    const { status, data } = await this.userService.findByEmail(user);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
