import {Characteristics} from "./Characteristics";

export type TeamPreview = {
  id: string;
  name: string;
  faction: string;
  rating: number;
  creatorNickname: string;
  time: string;
};

export type MyTeamPreview = {
  name: string;
  faction: string;
};

export type Injury = {
  id: string;
  name: string;
  characteristicsMods: Characteristics;
};

export type Advance = {
  id: string;
  name: string;
  characteristicsMods: Characteristics;
};

/*export type Fighter = {
  id: string;
  name: string;
  rang: string;
  description: string;
  characteristics: Characteristics;
  injuries: Injury[];
  advances: Advance[];
  weapons: Weapon[];
  equipment: Equipment[];
  skills: Skill[];
  status: Status;
  xp: number;
  lvl: number;
  totalCost: number;
};*/
