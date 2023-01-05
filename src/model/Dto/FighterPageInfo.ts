import { Fighter } from "./Fighter";

export class FighterPageInfo {
  navigationInfo!: NavigationInfo;
  fighter!: Fighter;
}

export type NavigationInfo = {
  teamId: number;
  teamName: string;
  otherFighters: {
    id: number;
    name: string;
  }[];
};
