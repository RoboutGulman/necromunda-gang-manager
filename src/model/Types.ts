import {timeStamp} from "console";
import { Characteristics } from "./Characteristics";

export type TeamPreview = {
  name: string;
  faction: string;
  rating: number;
  creatorNickname: string;
  time: string;
};

export type Trait = {
  name: string;
};

export type Upgrade = {
  name: string;
};

export type Weapon = {
  name: string;
  sr: number | null;
  lr: number | null;
  sm: number | null;
  lm: number | null;
  s: number | null;
  ap: number | null;
  d: number | null;
  am: number | null;
  traits: Trait[];
  upgrades: Upgrade[];
  cost: number;
  rarity: number | null;
  availibleOnTraidingPost: boolean;
};

export type Equipment = {
  name: string;
  rarity: number | null;
  cost: number;
};

type Skill = {
  name: string;
};

export enum Status {
  ACTIVE,
  DEAD,
  ON_RECOVERY
}

export type FighterView = {
  name: string;
  rang: string;
  totalCharacteristics: Characteristics;
  weapons: Weapon[];
  equipment: Equipment[];
  skills: Skill[];
  status: Status;
  totalCost: number;
};

export type Injury = {
  name: string;
  characteristicsMods: Characteristics;
};

export type Advance = {
  name: string;
  characteristicsMods: Characteristics;
};

export type Fighter = {
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
  totalCost: number
};

export type User = {
  name: string;
};

export type Team = {
  name: string;
  fighters: Fighter[];
  faction: string;
  creator: User;
};
