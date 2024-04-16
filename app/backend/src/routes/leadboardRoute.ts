import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const router = Router();

router.get('/home', (req: Request, res: Response) => matchController.getLeadboardHome(req, res));
router.get('/away', (req: Request, res: Response) => matchController.getLeadboardAway(req, res));

export default router;
