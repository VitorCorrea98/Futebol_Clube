import { HomeAwayModifiedLeadbord,
  IBalanceEfficiency,
  ILeadboard,
  IMatch,
} from '../../Interfaces/matches/IMatch';
import Leadboard from './GetHomeAwayMatches';

export default class LeadboardAll extends Leadboard {
  constructor(matches: IMatch[], allTeams: string[]) {
    super(matches, allTeams);
    this.leadboardFormat();
  }

  public getHomeAway(): { homeGames: HomeAwayModifiedLeadbord[];
    awayGames: HomeAwayModifiedLeadbord[]; } {
    const teste = super.getHomeAway();
    return teste;
  }

  public leadboardFormat(): ILeadboard[] {
    const fefe = super.leadboardFormat();
    console.log({ fefe });
    return fefe;
  }

  public LeaderBoardGoalsBalanceEfficiencyAdded(): IBalanceEfficiency[] {
    const oi = super.LeaderBoardGoalsBalanceEfficiencyAdded();
    return oi.sort((a, b) => {
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
