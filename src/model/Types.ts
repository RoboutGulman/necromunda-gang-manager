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

export type Trait = {
  id: string;
  name: string;
};

export type Upgrade = {
  id: string;
  name: string;
};

export type WeaponProfile = {
  name: string | null;
  isMelee: boolean;
  sr: number | null;
  lr: number | null;
  sm: number | null;
  lm: number | null;
  s: number | null;
  ap: number | null;
  d: number | null;
  am: number | null;
  traits: Trait[];
};

export type Weapon = {
  id: string;
  name: string;
  profiles: WeaponProfile[];
  upgrades: Upgrade[];
  cost: number;
  rarity: number | null;
  availibleOnTraidingPost: boolean;
};

export type Equipment = {
  id: string;
  name: string;
  rarity: number | null;
  cost: number;
};

type Skill = {
  id: string;
  name: string;
};

export enum Status {
  ACTIVE,
  DEAD,
  ON_RECOVERY
}

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

export type Fighter = {
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
};

export type FighterView = {
  id: string;
  name: string;
  rang: string;
  totalCharacteristics: Characteristics;
  weapons: Weapon[];
  equipment: Equipment[];
  skills: Skill[];
  status: Status;
  totalCost: number;
  xp: number;
};

export type User = {
  id: string;
  name: string;
};

export type TeamView = {
  id: string;
  name: string;
  fighters: FighterView[];
  faction: string;
  creator: User;
};
