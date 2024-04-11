import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals:number;
  awayTeamId:number;
  awayTeamGoals:number;
  inProgress: boolean;
}

export interface HomeAwayTeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
