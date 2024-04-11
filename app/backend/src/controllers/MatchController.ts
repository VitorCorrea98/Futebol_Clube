import { Request, Response } from 'express';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAllMatches(req: Request, res: Response) {
    const filter = req.query as { inProgress: string } | undefined;
    const { status, data } = await this.matchService.findAllMatches();
    if (filter && filter.inProgress) {
      const allMatches = data as unknown as { dataValues: IMatch }[];
      const toFilterActiveMatches = filter.inProgress.includes('true');
      const filteredMatches = allMatches
        .filter((match) => match.dataValues.inProgress === toFilterActiveMatches);
      console.log({ filteredMatches });
      return res.status(mapStatusHTTP(status)).json(filteredMatches);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
