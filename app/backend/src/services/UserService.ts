import { compareSync } from 'bcryptjs';
import { IUserLogin, IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async findByEmail(user: IUserLogin): Promise<ServiceResponse<IUser>> {
    const userFound = await this.userModel.findByEmail(user) as unknown as { dataValues: IUser };
    if (!userFound || !compareSync(user.password, userFound.dataValues.password)) {
      return {
        status: 'INVALID_KEYS', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: userFound.dataValues };
  }
}
