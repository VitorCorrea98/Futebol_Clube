import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private user = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    return this.user.findOne({ where: { email } });
  }

  async findRole(user: IUser): Promise<IUser | null> {
    return this.user.findOne({ where: { email: user.email }, attributes: ['role'] });
  }
}
