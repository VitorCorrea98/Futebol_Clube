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

  public LeaderBoardGoalsBalanceEfficiencyAdded(): IBalanceEfficiency[] {
    const oi = super.LeaderBoardGoalsBalanceEfficiencyAdded();
    return oi;
  }

  public leadboardFormat(): ILeadboard[] {
    const fefe = super.leadboardFormat();
    return fefe;
  }
}
