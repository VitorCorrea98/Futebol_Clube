import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModel from '../models/TeamModel';
import Leadboard from '../utils/Match/GetHomeAwayMatches';
import { HomeAwayMatch,
  HomeAwayTeamGoals,
  ILeadboard, IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(goals: HomeAwayTeamGoals, id: number): Promise<ServiceResponse<null>> {
    await this.matchModel.updateMatch(goals, id);
    return { status: 'SUCCESSFUL', data: null };
  }

  public async insertMatch(match: HomeAwayMatch): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.insertMatch(match);
    return { status: 'CREATED', data: newMatch };
  }

  public async getLeaderboardHome(): Promise<ServiceResponse<ILeadboard[]>> {
    const allMatches = await this.matchModel.findAllMatches();
    const allTeams = await new TeamModel().findAll() as unknown as { dataValues: ITeam }[];
    const allTeamsNames = allTeams.map((item) => item.dataValues.teamName);
    const leadboard = new Leadboard(allMatches, allTeamsNames, 'homeGames')
      .LeaderBoardGoalsBalanceEfficiencyAdded();

    return { status: 'SUCCESSFUL', data: leadboard };
  }
}
