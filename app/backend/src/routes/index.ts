import { Router } from 'express';
import teamRouter from './teamRoute';
import userRouter from './userRoute';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamRouter);

export default router;
