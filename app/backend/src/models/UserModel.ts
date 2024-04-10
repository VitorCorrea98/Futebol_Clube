import { IUser, IUserLogin } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private user = SequelizeUser;

  async findByEmail(user: IUserLogin): Promise<IUser | null> {
    return this.user.findOne({ where: { email: user.email } });
  }
}
