import { HomeAwayModifiedLeadbord,
  ILeadboard, IMatch, matchLeadbordInicialValues } from '../../Interfaces/matches/IMatch';

export default class Leadboard {
  constructor(
    private matches: IMatch[],
  ) {}

  public getHomeAway() {
    const homeGames = this.matches.filter((match) => match.inProgress === false)
      .map((match) => ({
        name: match.homeTeam?.teamName,
        againstGoals: match.homeTeamGoals,
        favorGoals: match.awayTeamGoals,
        win: match.homeTeamGoals > match.awayTeamGoals ? 1 : 0,
        draw: match.homeTeamGoals === match.awayTeamGoals ? 1 : 0,
        lose: match.homeTeamGoals < match.awayTeamGoals ? 1 : 0,
      })) as HomeAwayModifiedLeadbord[];

    const awayGames = this.matches.filter((match) => match.inProgress === false).map((match) => ({
      name: match.awayTeam?.teamName,
      againstGoals: match.homeTeamGoals,
      favorGoals: match.awayTeamGoals,
      win: match.homeTeamGoals > match.awayTeamGoals ? 1 : 0,
      draw: match.homeTeamGoals === match.awayTeamGoals ? 1 : 0,
      lose: match.homeTeamGoals < match.awayTeamGoals ? 1 : 0,
    })) as HomeAwayModifiedLeadbord[];
    return [...homeGames, ...awayGames];
  }

  public leadboardFormat() {
    const allMatches = this.getHomeAway();
    const resultMatches = allMatches.map((match) => {
      const results = allMatches.reduce((acc, curr): ILeadboard => {
        if (curr.name === match.name) {
          return ({
            name: match.name,
            totalPoints: acc.totalPoints + (curr.win ? 3 : 0) + (curr.draw ? 1 : 0),
            totalGames: acc.totalGames + 1,
            totalVictories: acc.totalVictories + curr.win,
            totalDraws: acc.totalDraws + curr.draw,
            totalLosses: acc.totalLosses + curr.lose,
            goalsFavor: acc.goalsFavor + curr.favorGoals,
            goalsOwn: acc.goalsOwn + curr.againstGoals,
          });
        } return acc;
      }, matchLeadbordInicialValues); return results;
    }); return resultMatches;
  }
}
