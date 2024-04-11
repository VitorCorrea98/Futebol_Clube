import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/users/IUser';
import { ServiceResponseError } from '../Interfaces/ServiceResponse';
import Validate from '../middlewares/user/LoginValidate';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  private secret = 'jwtSecret';
  constructor(
    private userService = new UserService(),
  ) {}

  public async userLogin(req: Request, res: Response) {
    const user = req.body;
    const error = new Validate(user).Login() as unknown as ServiceResponseError;
    if (error) return res.status(mapStatusHTTP(error.status)).json(error.data);

    const { status, data } = await this.userService.userLogin(user);
    const { email } = user;
    const token = jwt.sign({ data: { email } }, this.secret);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(mapStatusHTTP(status)).json({ token });
  }

  public async getUserRole(req: Request, res: Response) {
    const user = req.body as unknown as IUser;
    const { status, data } = await this.userService.getUserRole(user);
    console.log({ user, status, data });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
