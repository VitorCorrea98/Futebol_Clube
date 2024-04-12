import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals:number;
  awayTeamId:number;
  awayTeamGoals:number;
  inProgress: boolean;
  homeTeam?: {
    teamName: string
  },
  awayTeam?: {
    teamName: string
  },
}

export interface HomeAwayTeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface HomeAwayMatch extends HomeAwayTeamGoals {
  homeTeamId: number;
  awayTeamId: number;
}

export interface HomeAwayModifiedLeadbord {
  name: string;
  win: number;
  draw: number;
  lose: number;
  favorGoals: number;
  againstGoals: number;
}

export interface ILeadboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export const matchLeadbordInicialValues: ILeadboard = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};
