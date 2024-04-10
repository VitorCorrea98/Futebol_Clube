import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    console.log({ allTeams });
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
