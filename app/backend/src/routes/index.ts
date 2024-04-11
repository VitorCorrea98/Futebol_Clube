import { Router } from 'express';
import teamRouter from './teamRoute';
import userRouter from './userRoute';
import matchRouter from './matchRoute';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
