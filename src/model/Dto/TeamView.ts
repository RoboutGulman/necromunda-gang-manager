import { Faction, FighterView, Territory, User } from "../Types";

export class TeamView {
  availibleForEdit!: boolean;
  info!: TeamInfo;
  fighters!: FighterView[];
}

export type TeamInfo = {
  id: string;
  name: string;
  rating: number;
  cash: number;
  reputation: number;
  description: string;
  lastEditTime: Date;
  creationTime: Date;
  gamesPlayed: number;
  faction: Faction;
  creator: User;
  territories: Territory[];
  rangStatistics: RangStatistics;
};

export type RangStatistics = {
  total: number;
  rangs: RangCount[];
};

export type RangCount = {
  name: string;
  count: number;
};
