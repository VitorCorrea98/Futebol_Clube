import { HomeAwayMatch } from '../../Interfaces/matches/IMatch';

export default class ExtractTeamId {
  constructor(private match: HomeAwayMatch) {}
  public getIds() {
    const homeTeam = this.match.homeTeamId;
    const awayTeam = this.match.awayTeamId;
    return [homeTeam, awayTeam];
  }
}
