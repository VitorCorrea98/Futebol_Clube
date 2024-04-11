import { HomeAwayMatch, HomeAwayTeamGoals, IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private match = SequelizeMatch;

  async findAllMatches(): Promise<IMatch[]> {
    return this.match.findAll(
      { include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ] },
    );
  }

  async finishMatch(id: number): Promise<void> {
    await this.match.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(goals: HomeAwayTeamGoals, id: number): Promise<void> {
    await this
      .match
      .update({
        homeTeamGoals: goals.homeTeamGoals,
        awayTeamGoals: goals.awayTeamGoals,
      }, { where: { id } });
  }

  async insertMatch(match: HomeAwayMatch): Promise<IMatch> {
    const newMatch = await this.match.create({ ...match, inProgress: true });
    return newMatch.dataValues;
  }
}
