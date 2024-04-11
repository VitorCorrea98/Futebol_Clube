import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchService.findAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
