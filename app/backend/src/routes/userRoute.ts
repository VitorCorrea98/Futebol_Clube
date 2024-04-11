import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import TokenAuth from '../middlewares/TokenAuth';

const userController = new UserController();
const tokenAuth = new TokenAuth();

const router = Router();

router.post('/', (req: Request, res: Response) => userController.userLogin(req, res));
router.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => tokenAuth.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default router;
