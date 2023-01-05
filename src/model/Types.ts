import { Characteristics } from "./Characteristics";

export type User = {
  id: string;
  name: string;
};

export type SpecialRule = {
  id: string;
  name: string;
};

export type Trait = {
  id: string;
  name: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type TeamPreview = {
  id: string;
  name: string;
  faction: string;
  rating: number;
  creatorNickname: string;
  time: string;
};

export type WeaponUpgrade = {
  id: string;
  name: string;
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
  id: string;
  name: string;
  profiles: WeaponProfile[];
  upgrades: WeaponUpgrade[];
  cost: number;
  rarity: number | null;
  availibleOnTraidingPost: boolean;
};

export type Equipment = {
  id: string | null;
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
  lvl: number;
};

export type Faction = {
  id: string;
  name: string;
  imageUrl: string;
};

export type Territory = {
  id: string;
  name: string;
};
