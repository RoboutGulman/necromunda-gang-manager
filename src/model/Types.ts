import { Characteristics } from "./Characteristics";

export type User = {
  id: number;
  name: string;
};

export type SpecialRule = {
  id: number;
  name: string;
};

export type Trait = {
  id: number;
  name: string;
};

export type Skill = {
  id: number;
  name: string;
};

export type TeamPreview = {
  id: number;
  name: string;
  faction: string;
  rating: number;
  creatorNickname: string;
  time: string;
};

export type WeaponUpgrade = {
  id: number;
  name: string;
};

export type MyTeamPreview = {
  name: string;
  faction: string;
};

export type Injury = {
  id: number;
  name: string;
  characteristicsMods: Characteristics;
};

export type Advance = {
  id: number;
  name: string;
  characteristicsMods: Characteristics;
};

export type WeaponProfile = {
  name: string | null;
  sr: string | null;
  lr: string | null;
  sm: string | null;
  lm: string | null;
  s: string | null;
  ap: string | null;
  d: string | null;
  am: string | null;
  traits: Trait[];
};

export type Weapon = {
  id: number;
  name: string;
  profiles: WeaponProfile[];
  upgrades: WeaponUpgrade[];
  cost: number;
  rarity: number | null;
  availibleOnTraidingPost: boolean;
};

export type Equipment = {
  id: number;
  name: string;
  rarity: number | null;
  cost: number;
};

export enum Status {
  ACTIVE,
  DEAD,
  ON_RECOVERY,
}

export type FighterView = {
  id: number;
  name: string;
  rang: string;
  totalCharacteristics: Characteristics;
  weapons: Weapon[];
  equipment: Equipment[];
  skills: Skill[];
  status: Status;
  totalCost: number;
  xp: number;
  lvl: number;
};

export type Faction = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Territory = {
  id: number;
  name: string;
};
