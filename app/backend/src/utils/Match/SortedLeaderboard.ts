import { IBalanceEfficiency } from '../../Interfaces/matches/IMatch';

export default class SortedLeaderboard {
  constructor(private _leaderboard: IBalanceEfficiency[]) {}

  public sort() {
    return this._leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalPoints === b.totalPoints
      && b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.totalVictories === b.totalVictories
      && b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsBalance === b.goalsBalance
      && b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
  }
}
