import { Fighter } from "./Fighter";

export class NavigationInfo {
  teamId!: number;
  teamName!: string;
  fighters!: {
    id: number;
    name: string;
  }[];
}
