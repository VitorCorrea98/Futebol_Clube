import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/users/IUser';
import UserService from '../services/UserService';

export default class TokenAuth {
  constructor(
    private userService = new UserService(),
  ) {}

  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = bearerToken.split(' ')[1];
    try {
      const secret = 'jwtSecret';
      const decoded = jwt.verify(token, secret) as { data: { email: string } };
      const user = await this
        .userService.findByEmail(decoded.data.email) as unknown as { dataValues: IUser };
      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }
      req.cookies = user.dataValues;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
