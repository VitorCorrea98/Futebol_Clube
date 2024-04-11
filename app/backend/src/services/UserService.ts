import { compareSync } from 'bcryptjs';
import { IUserLogin, IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async findByEmail(email: string): Promise<IUser | null> {
    const userFound = await this.userModel.findByEmail(email);
    return userFound;
  }

  public async userLogin(user: IUserLogin): Promise<ServiceResponse<IUser>> {
    console.log({ user });
    const userFound = await this
      .userModel.findByEmail(user.email) as unknown as { dataValues: IUser };
    if (!userFound || !compareSync(user.password, userFound.dataValues.password)) {
      return {
        status: 'INVALID_KEYS', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: userFound.dataValues };
  }

  public async getUserRole(user: IUser): Promise<ServiceResponse<IUser>> {
    const userRole = await this.userModel.findRole(user);
    if (!userRole) return { status: 'INVALID_DATA', data: { message: 'User not found' } };

    return { status: 'SUCCESSFUL', data: userRole };
  }
}
