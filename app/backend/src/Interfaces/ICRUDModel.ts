import { HomeAwayMatch, HomeAwayTeamGoals, IMatch } from './matches/IMatch';
import { IUser } from './users/IUser';

export interface ICRUDModelTeam<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export interface ICRUDModelUser<T> {
  findByEmail(email: string): Promise<T | null>;
  findRole(user: IUser): Promise<T | null>
}

export interface ICRUDModelMatch<T> {
  findAllMatches(): Promise<T[]>;
  finishMatch(id: number): Promise<void>;
  updateMatch(goals: HomeAwayTeamGoals, id: number): Promise<void>;
  insertMatch(match: HomeAwayMatch): Promise<IMatch>;
}

export interface ICRUDModel<T> extends ICRUDModelTeam<T>, ICRUDModelUser<T> {}
