import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenAuth from '../middlewares/TokenAuth';

const matchController = new MatchController();
const authToken = new TokenAuth();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));
router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => authToken.verifyToken(req, res, next),
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
