import { User } from "../Types";

export class RecentTeamsDto {
  totalTeamsNumber!: number;
  teams!: RecentTeam[];
}

export type RecentTeam = {
  id: number;
  name: string;
  rating: number;
  faction: Faction;
  lastEditTime: number;
  creator: User;
};

type Faction = {
  id: number;
  name: string;
};
