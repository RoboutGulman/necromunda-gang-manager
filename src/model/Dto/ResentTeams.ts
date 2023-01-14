import { User } from "../Types";

export class RecentTeams {
  totalTeamsNumber!: number;
  teams!: RecentTeam[];
}

export type RecentTeam = {
  id: number;
  name: string;
  rating: number;
  timeSinceLastEdit: Date;
  faction: Faction;
  creator: User;
};

type Faction = {
  id: number;
  name: string;
};
