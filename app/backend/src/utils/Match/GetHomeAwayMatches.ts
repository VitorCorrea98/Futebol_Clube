import { HomeAwayModifiedLeadbord,
  IBalanceEfficiency,
  ILeadboard, IMatch, matchLeadbordInicialValues } from '../../Interfaces/matches/IMatch';
import SortedLeaderboard from './SortedLeaderboard';

export default class Leaderboard {
  constructor(
    private matches: IMatch[],
    private allTeams: string[],
    private leaderBoardSide?: 'homeGames' | 'awayGames',
  ) {}

  public getHomeAway() {
    const homeGames = this.matches.filter((match) => match.inProgress === false).map((match) => ({
      name: match.homeTeam?.teamName,
      againstGoals: match.awayTeamGoals,
      favorGoals: match.homeTeamGoals,
      win: match.homeTeamGoals > match.awayTeamGoals ? 1 : 0,
      draw: match.homeTeamGoals === match.awayTeamGoals ? 1 : 0,
      lose: match.homeTeamGoals < match.awayTeamGoals ? 1 : 0,
    })) as HomeAwayModifiedLeadbord[];

    const awayGames = this.matches.filter((match) => match.inProgress === false)
      .map((match) => ({
        name: match.awayTeam?.teamName,
        againstGoals: match.homeTeamGoals,
        favorGoals: match.awayTeamGoals,
        win: match.awayTeamGoals > match.homeTeamGoals ? 1 : 0,
        draw: match.awayTeamGoals === match.homeTeamGoals ? 1 : 0,
        lose: match.awayTeamGoals < match.homeTeamGoals ? 1 : 0,
      })) as HomeAwayModifiedLeadbord[];
    return { homeGames, awayGames };
  }

  public leadboardFormat() {
    const allMatches = this.getHomeAway()[this.leaderBoardSide as 'homeGames' | 'awayGames'];
    const teste = allMatches || [...this.getHomeAway().awayGames, ...this.getHomeAway().homeGames];
    const resultMatches = this.allTeams.map((match) => {
      const results = teste.reduce((acc, curr): ILeadboard => {
        if (curr.name === match) {
          return ({
            name: match,
            totalPoints: acc.totalPoints + (curr.win ? 3 : 0) + (curr.draw ? 1 : 0),
            totalGames: acc.totalGames + 1,
            totalVictories: acc.totalVictories + curr.win,
            totalDraws: acc.totalDraws + curr.draw,
            totalLosses: acc.totalLosses + curr.lose,
            goalsFavor: acc.goalsFavor + curr.favorGoals,
            goalsOwn: acc.goalsOwn + curr.againstGoals });
        } return acc;
      }, matchLeadbordInicialValues); return results;
    }); return resultMatches;
  }

  public LeaderBoardGoalsBalanceEfficiencyAdded() {
    const leaderBoard = this.leadboardFormat() as unknown as ILeadboard[];
    const result = leaderBoard.reduce((acc, curr): IBalanceEfficiency[] => {
      const newKeys: IBalanceEfficiency = {
        ...curr,
        goalsBalance: curr.goalsFavor - curr.goalsOwn,
        efficiency: (((curr.totalPoints) / (curr.totalGames * 3)) * 100).toFixed(2),
      }; return [...acc, newKeys];
    }, [] as IBalanceEfficiency[]);
    const resultSorted = new SortedLeaderboard(result).sort();
    return resultSorted;
  }
}
