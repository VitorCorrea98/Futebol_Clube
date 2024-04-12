import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const router = Router();

router.get('/home', (req: Request, res: Response) => matchController.getLeadboard(req, res));

export default router;
