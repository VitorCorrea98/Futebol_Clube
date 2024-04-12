import { HomeAwayMatch, IMatch } from "../../Interfaces/matches/IMatch";

const match: IMatch = {
  id: 1,
  awayTeamGoals: 1,
  awayTeamId: 2,
  homeTeamGoals: 2,
  homeTeamId: 5,
  inProgress: true
};

const matches = [match];

const HomeAwayGoals = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

const HomeAwayMatch = {
  "homeTeamId": 16,
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

export {
  match,
  matches,
  HomeAwayGoals,
  HomeAwayMatch
}