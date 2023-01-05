import { User } from "../Types";

export class RecentTeams {
  totalTeamsNumber!: number;
  teams!: RecentTeam[];
}

export type RecentTeam = {
  id: number;
  name: string;
  rating: number;
  timeSinceLastEdit: string;
  faction: Faction;
  creator: User;
};

type Faction = {
  id: number;
  name: string;
};
