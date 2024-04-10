import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private team = SequelizeTeam;

  async findAll(): Promise<ITeam[]> { return this.team.findAll(); }

  async findById(id: number): Promise<ITeam | null> { return this.team.findOne({ where: { id } }); }
}
