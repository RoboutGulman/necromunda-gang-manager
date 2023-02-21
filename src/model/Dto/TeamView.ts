import {
  rangStatisticsExample,
  territoriesExample,
} from "../FakeData/FakeData";
import { Faction, FighterView, Territory, User } from "../Types";

export class TeamView {
  availableForEdit!: boolean;
  name!: string;
  rating!: number;
  cash!: number;
  reputation!: number;
  description!: string;
  lastEditTime!: number;
  creationTime!: number;
  gamesPlayed!: number;
  isOutlaw!: boolean;
  faction!: Faction;
  creator!: User;
  //rangStatistics
  fighters!: FighterView[];
}

// export type TeamInfo = {
//   id: number;

//   territories: Territory[];
//   rangStatistics: RangStatistics;
// };

export type TeamInfo = {
  name: string;
  rating: number;
  cash: number;
  reputation: number;
  description: string;
  lastEditTime: number;
  creationTime: number;
  gamesPlayed: number;
  isOutlaw: boolean;
  faction: Faction;
  creator: User;
  territories: Territory[];
  rangStatistics: RangStatistics;
};

export function getTeamInfo(team: TeamView): TeamInfo {
  return {
    name: team.name,
    rating: team.rating,
    cash: team.cash,
    reputation: team.reputation,
    description: team.description,
    lastEditTime: team.lastEditTime,
    creationTime: team.creationTime,
    gamesPlayed: team.gamesPlayed,
    isOutlaw: team.isOutlaw,
    faction: team.faction,
    creator: team.creator,
    /* TODO: поменять fakeData на реальные данные */
    territories: territoriesExample,
    rangStatistics: rangStatisticsExample,
  };
}

export type RangStatistics = {
  total: number;
  rangs: RangCount[];
};

export type RangCount = {
  name: string;
  count: number;
};
