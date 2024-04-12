import { Request, Response } from 'express';
import ExtractTeamId from '../utils/Match/ExtractTeamId';
import { HomeAwayMatch, IMatch } from '../Interfaces/matches/IMatch';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
    private teamService = new TeamService(),
  ) {}

  public async findAllMatches(req: Request, res: Response) {
    const filter = req.query as { inProgress: string } | undefined;
    const { status, data } = await this.matchService.findAllMatches();
    if (filter && filter.inProgress) {
      const allMatches = data as unknown as { dataValues: IMatch }[];
      const toFilterMatches = filter.inProgress.includes('true');
      const filteredMatches = allMatches
        .filter((match) => match.dataValues.inProgress === toFilterMatches);
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
    const { status } = await this.matchService.updateMatch(goals, Number(id));
    return res.status(mapStatusHTTP(status)).json({ message: 'Updated' });
  }

  public async insertMatch(req: Request, res: Response) {
    const match = req.body as HomeAwayMatch;
    const extract = new ExtractTeamId(match);

    const sameTeam = match.awayTeamId === match.homeTeamId;
    if (sameTeam) {
      return res
        .status(mapStatusHTTP('SAME_TEAM'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamsId = extract.getIds();
    const allTeams = await Promise.all(teamsId
      .map(async (team) => this.teamService.findById(team)));

    const someTeamDoesntExist = allTeams.find((team) => team.status === 'NOT_FOUND');
    if (someTeamDoesntExist) {
      return res.status(mapStatusHTTP(someTeamDoesntExist.status)).json(someTeamDoesntExist.data);
    }

    const { status, data } = await this.matchService.insertMatch(match);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeadboard(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getLeadboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
