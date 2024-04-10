import { IUserLogin, IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async findByEmail(user: IUserLogin): Promise<ServiceResponse<IUser>> {
    const userFound = await this.userModel.findByEmail(user);
    if (!userFound) return { status: 'NOT_FOUND', data: { message: 'User not found' } };

    return { status: 'SUCCESSFUL', data: userFound };
  }
}
