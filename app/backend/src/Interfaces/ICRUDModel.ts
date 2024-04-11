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
  finishMatch(id: number): Promise<void>
}

export interface ICRUDModel<T> extends ICRUDModelTeam<T>, ICRUDModelUser<T> {}
