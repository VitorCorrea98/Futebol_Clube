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

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const goals = req.body;
    console.log({ goals, id });
    const { status } = await this.matchService.updateMatch(goals, Number(id));
    return res.status(mapStatusHTTP(status)).json({ message: 'Updated' });
  }

  public async insertMatch(req: Request, res: Response) {
    const match = req.body;

    const { status, data } = await this.matchService.insertMatch(match);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
